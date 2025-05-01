[Partner Tools](../)
# SuiteCRM with Azure

Under Development - SQL table CREATE script for Azure

[SuiteCRM](https://SuiteCRM.com) provides a standardized partner admin [database schema](https://schema--suitecrm-docs.netlify.app/schema) with a large [developer community](https://community.SuiteCRM.com).

[Download Java for Desktop users](https://www.java.com/en/download/)

[Download version 8.7.1](https://suitecrm.com/wpfd_file/suitecrm-8-7-1/) or a more recent [download](https://suitecrm.com/download/) if a matching .sh file is available.
Unzip in your webroot. Rename the folder to **SuiteCRM**.

## Our quick install with shell script

Summary of what's included for each OS within the start.sh script

| OS      | PHP            | Apache        | DB Option                    |
|---------|----------------|---------------|------------------------------|
| Linux   | via apt        | via apt       | MariaDB                      |
| macOS   | via brew       | via brew      | MariaDB                      |
| Windows | via Chocolatey | via Chocolatey| SQL Server Express / Azure   |

<br>

[Get our .sh fork](https://github.com/motaviegas/SuiteCRM_Script) - Initially developed by Chris for his 10 minute install [video](https://www.youtube.com/watch?v=eycqCChZ8nI) for Linux.  

Rename to **start.sh**

Give the .sh file permission within the SuiteCRM folder:

	sudo chmod +x ./start.sh

<!--
	Not from video, probably don't need.
	sudo chmod -R 755 .
-->

Run and confirm with the [steps below video](https://community.suitecrm.com/t/how-to-install-suitecrm-8-6-1-under-10-minutes/93252).


	./start.sh

Take note of the user and password of the MariaDB database that will be requested.

You may need to run these if you have brew errors:

	brew install --cask temurin

	# Not sure if these two cmds needed
	brew untap homebrew/cask-versions
	brew untap AdoptOpenJDK/openjdk

	brew uninstall --cask adoptopenjdk13
	brew uninstall python@3.8


For Error: Permission denied @ apply2files - /usr/local/lib/docker/cli-plugins
Deleting the folder was necessary (better than adding user permissions on Docker folder)

	sudo rm -rf /usr/local/lib/docker
	brew cleanup

Don't install Docker with Homebrew. 
Docker for Mac (Docker Desktop) provides better performance and integration with the operating system. 


From steps below video:

When the .sh script finishes successfully, run the cmd:

    sudo mysql_secure_installation


**Current error**

	Can't connect to local MySQL server through socket '/tmp/mysql.sock'

<!--
Is there a solution [in this post](https://community.suitecrm.com/t/suitecrm-8-install-problem-mysql-connection/83267/18)?
-->
