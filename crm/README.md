[Partner Tools](../)
# SuiteCRM with Azure

Under Development - SQL table CREATE script for Azure

[SuiteCRM](https://SuiteCRM.com) provides a standardized partner admin [database schema](https://schema--suitecrm-docs.netlify.app/schema) with a large [developer community](https://community.SuiteCRM.com).

[Download version 8.7.1](https://suitecrm.com/wpfd_file/suitecrm-8-7-1/) or a more recent [download](https://suitecrm.com/download/) if a matching .sh file is available.

[Get the .sh file](https://github.com/motaviegas/SuiteCRM_Script) developed by Chris for his 10 minute install [video](https://www.youtube.com/watch?v=eycqCChZ8nI).

Rename the downloaded .sh file to **start.sh**

Give it permission:

	sudo chmod +x ./start.sh

<!--
	Not from video, probably don't need.
	sudo chmod -R 755 .
-->
Run to start:

	./start.sh

**Current error**

	Can't connect to local MySQL server through socket '/tmp/mysql.sock'

Is there a solution [in this post](https://community.suitecrm.com/t/suitecrm-8-install-problem-mysql-connection/83267/18)?
