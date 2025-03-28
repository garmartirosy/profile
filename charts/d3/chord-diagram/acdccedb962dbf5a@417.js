function _1(md){return(
md`
<h1>D Matrix Chord Diagram</h1>

Relates impacts to sectors

Name array was manually copied from the Excel file in Feb 2024 report.

TO DO: Copy this folder. Name it "chord-diagram-sectors" and use the L Matrix for Sector to Sector.  
TO DO: Build array of colors using a D3 loop that matches the number of names.  
TO DO: Pull matrix data directly from [Github files](https://github.com/ModelEarth/profile/tree/main/impacts/2020/GAEEIOv1.0-s-20/matrix) via [D Matrix raw URL](https://raw.githubusercontent.com/ModelEarth/profile/main/impacts/2020/GAEEIOv1.0-s-20/matrix/D.json)  
TO DO: Activate rollovers like [nivo.rocks/chord](https://nivo.rocks/chord/)

Important: To avoid breaking Github Pages build, deleted "env" folder from original download.
`
)}

/* Remove from initial https://observablehq.com/@d3/chord-diagram@417
<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Chord diagram</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Chord diagram

The outer arcs in this [chord diagram](https://d3js.org/d3-chord) show the proportion of survey respondents owning a particular brand of phone, while the inner chords show the brand of these individuals’ previous phone. Hence, this chart shows how the consumers shift between brands. Data via [Nadieh Bremer](https://www.visualcinnamon.com/2014/12/using-data-storytelling-with-chord.html).
*/

function _chart(data,d3,groupTicks)
{
  const width = 800;
  const height = width + 100;
  const {names, colors} = data;
  const outerRadius = Math.min(width, height) * 0.5 - 60;
  const innerRadius = outerRadius - 10;
  const tickStep = d3.tickStep(0, d3.sum(data.flat()), 100);
  const formatValue = d3.format(".1~%");

  const chord = d3.chord()
      .padAngle(10 / innerRadius)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending);

  const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

  const ribbon = d3.ribbon()
      .radius(innerRadius - 1)
      .padAngle(1 / innerRadius);

  const color = d3.scaleOrdinal(names, colors);

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");

  const chords = chord(data);

  const group = svg.append("g")
    .selectAll()
    .data(chords.groups)
    .join("g");

  group.append("path")
      .attr("fill", d => color(names[d.index]))
      .attr("d", arc);

  group.append("title")
      .text(d => `${names[d.index]}\n${formatValue(d.value)}`);

  const groupTick = group.append("g")
    .selectAll()
    .data(d => groupTicks(d, tickStep))
    .join("g")
      .attr("transform", d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(${outerRadius},0)`);

  groupTick.append("line")
      .attr("stroke", "currentColor")
      .attr("x2", 6);

  groupTick.append("text")
      .attr("x", 8)
      .attr("dy", "0.35em")
      .attr("transform", d => d.angle > Math.PI ? "rotate(180) translate(-16)" : null)
      .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
      .text(d => formatValue(d.value));

  group.select("text")
      .attr("font-weight", "bold")
      .text(function(d) {
        return this.getAttribute("text-anchor") === "end"
            ? `↑ ${names[d.index]}`
            : `${names[d.index]} ↓`;
      });

  svg.append("g")
      .attr("fill-opacity", 0.8)
    .selectAll("path")
    .data(chords)
    .join("path")
      .style("mix-blend-mode", "multiply")
      .attr("fill", d => color(names[d.source.index]))
      .attr("d", ribbon)
    .append("title")
      .text(d => `${formatValue(d.source.value)} ${names[d.target.index]} → ${names[d.source.index]}${d.source.index === d.target.index ? "" : `\n${formatValue(d.target.value)} ${names[d.source.index]} → ${names[d.target.index]}`}`);

  return svg.node();
}


function _groupTicks(d3){return(
function groupTicks(d, step) {
  const k = (d.endAngle - d.startAngle) / d.value;
  return d3.range(0, d.value, step).map(value => {
    return {value: value, angle: value * k + d.startAngle};
  });
}
)}

/*
function _data(){return(
Object.assign([
  [.096899, .008859, .000554, .004430, .025471, .024363, .005537, .025471],
  [.001107, .018272, .000000, .004983, .011074, .010520, .002215, .004983],
  [.000554, .002769, .002215, .002215, .003876, .008306, .000554, .003322],
  [.000554, .001107, .000554, .012182, .011628, .006645, .004983, .010520],
  [.002215, .004430, .000000, .002769, .104097, .012182, .004983, .028239],
  [.011628, .026024, .000000, .013843, .087486, .168328, .017165, .055925],
  [.000554, .004983, .000000, .003322, .004430, .008859, .017719, .004430],
  [.002215, .007198, .000000, .003322, .016611, .014950, .001107, .054264]
], {
  names: ["Apple", "HTC", "Huawei", "LG", "Nokia", "Samsung", "Sony", "Other"],
  colors: ["#c4c4c4", "#69b40f", "#ec1d25", "#c8125c", "#008fc8", "#10218b", "#134b24", "#737373"]
})
)}
*/

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["data","d3","groupTicks"], _chart);
  main.variable(observer("groupTicks")).define("groupTicks", ["d3"], _groupTicks);
  main.variable(observer("data")).define("data", _data);
  return main;
}

// The Q Matrix had NAN values. Need a script to remove.
// USEEIO Georgia L Matrix (50K), 
// https://github.com/ModelEarth/profile/blob/main/impacts/2020/GAEEIOv1.0-s-20/matrix/L.json
// https://raw.githubusercontent.com/ModelEarth/profile/main/impacts/2020/GAEEIOv1.0-s-20/matrix/L.json

function _data(){return(
Object.assign([
  [1.0800607890192, 0.005522719782418037, 0.00022000345809565104, 0.00047269996125993687, 0.00044705336638906426, 0.00016183999991255515],
  [0.043172378952080495, 1.0672150827845328, 0.00019497936245598476, 0.0007269357479965577, 0.0005846016350414639, 0.00020870084721420087],
  [0.0014843814050624576, 0.0004858203134559161, 1.0045297810330993, 0.0013342916333777817, 0.0012046024211072983, 0.0062157551884995344],
  [0.003146378777880447, 0.0001863819544131643, 0.005945092438082913, 1.0296368779194864, 0.018295451353867093, 0.0075688263216878385],
  [0.000019152571532533735, 0.0000015765178697170799, 0.00015019093651359952, 0.005804546425729994, 1.0057338466226045, 0.00004438546032710554],
  [0.02112285028429029, 0.0029538030777275545, 0.04069511041647788, 0.0264449714917467, 0.017671000189413453, 1.0510159023256036]
], {
  names: ["111CA/US-GA", "113FF/US-GA", "211/US-GA", "212/US-GA", "213/US-GA", "22/US-GA"],
  colors: ["#c4c4c4", "#69b40f", "#ec1d25", "#c8125c", "#008fc8", "#10218b"]
})
)}
// namesImpacts is not needed in this page.
