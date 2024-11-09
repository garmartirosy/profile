# Used by Github Action workflow
# But looks similar to product-footprints.py
# TO DO: Get workflow working, documet how to set secret in Github 
# Change from using a token (since it expires in 3 days) to using a BuildingTransparency.org accoun email and password.

import requests, json, csv, logging, multiprocessing, pandas as pd, yaml, os
from functools import partial

states = ['US-GA', 'US-ME', 'US-OR']
epds_url = "https://buildingtransparency.org/api/epds"
page_size = 250

logging.basicConfig(
    level=logging.DEBUG,
    filename="output.log",
    datefmt="%Y/%m/%d %H:%M:%S",
    format="%(asctime)s - %(name)s - %(levelname)s - %(lineno)d - %(module)s - %(message)s",
)
logger = logging.getLogger(__name__)

def log_error(status_code: int, response_body: str):
    logging.error(f"Request failed with status code: {status_code}")
    logging.debug("Response body:" + response_body)

def get_auth():
    url_auth = "https://etl-api.cqd.io/api/rest-auth/login"
    headers_auth = {
        "accept": "application/json",
        "Content-Type": "application/json"
    }
    payload_auth = {
        "username": os.getenv('web@model.earth'),
        "password": os.getenv('getTheData123#')
    }
    response_auth = requests.post(url_auth, headers=headers_auth, json=payload_auth)
    if response_auth.status_code == 200:
        authorization = 'Bearer ' + response_auth.json()['key']
        print("Fetched the new token successfully")
        return authorization
    else:
        print(f"Failed to login. Status code: {response_auth.status_code}")
        print("Response body:", response_auth.json())

def fetch_a_page(page: int, headers, state: str) -> list:
    logging.info(f'Fetching state: {state}, page: {page}')
    params = {"plant_geography": state, "page_size": page_size, "page_number": page}
    response = requests.get(epds_url, headers=headers, params=params)
    if response.status_code != 200:
        log_error(response.status_code, str(response.json()))
        return []
    return list(map(map_response, json.loads(response.text)))

def fetch_epds(state: str, authorization) -> list:
    params = {"plant_geography": state, "page_size": page_size}
    headers = {"accept": "application/json", "Authorization": authorization}

    response = requests.get(epds_url, headers=headers, params=params)
    if response.status_code != 200:
        log_error(response.status_code, str(response.json()))
        return []

    with multiprocessing.Pool(processes=50) as pool:
        selective_responses = pool.map(
            partial(fetch_a_page, headers=headers, state=state), range(1, int(response.headers['X-Total-Pages']) + 1)
        )
    flat_list = sum(selective_responses, [])
    return flat_list

def map_response(epd: dict) -> dict:
    dict_attributes = {}
    dict_attributes['Category_epd_name'] = epd['category']['openepd_name']
    dict_attributes['Name'] = epd['name']
    dict_attributes['ID'] = epd['open_xpd_uuid']
    dict_attributes['Zip'] = epd['plant_or_group'].get('postal_code', None)
    dict_attributes['County'] = epd['plant_or_group'].get('admin_district2', None)
    dict_attributes['Address'] = epd['plant_or_group'].get('address', None)
    dict_attributes['Latitude'] = epd['plant_or_group'].get('latitude', None)
    dict_attributes['Longitude'] = epd['plant_or_group'].get('longitude', None)
    return dict_attributes

def write_csv_others(title: str, epds: list):
    new_data = pd.DataFrame(epds)
    try:
        existing_data = pd.read_csv(f"{title}.csv")
    except FileNotFoundError:
        existing_data = pd.DataFrame()

    if not new_data.equals(existing_data):
        new_data.to_csv(f"{title}.csv", index=False)

def write_csv_cement(epds: list):
    new_data = pd.DataFrame(epds)
    try:
        existing_data = pd.read_csv("Cement.csv")
    except FileNotFoundError:
        existing_data = pd.DataFrame()

    if not new_data.equals(existing_data):
        new_data.to_csv("Cement.csv", index=False)

def write_epd_to_csv(epds: list, state: str):
    cement_list = []
    others_list = []
    for epd in epds:
        if epd is None:
            continue
        category_name = epd['Category_epd_name'].lower()
        if 'cement' in category_name:
            cement_list.append(epd)
        else:
            others_list.append(epd)
    write_csv_cement(cement_list)
    write_csv_others(state, others_list)

if __name__ == "__main__":
    authorization = get_auth()
    if authorization:
        for state in states:
            results = fetch_epds(state, authorization)
            write_epd_to_csv(results, state)
    else:
        print("Authorization failed, exiting...")
