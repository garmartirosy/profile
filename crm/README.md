[Partner Tools](../)
# SuiteCRM with Azure

Under Development - SQL table CREATE script for Azure

[SuiteCRM](https://SuiteCRM.com) provides a standardized partner admin [database schema](https://schema--suitecrm-docs.netlify.app/schema) with a large [developer community](https://community.SuiteCRM.com).

[Download version 8.7.1](https://suitecrm.com/wpfd_file/suitecrm-8-7-1/) or a more recent [download](https://suitecrm.com/download/) if a matching .sh file is available.
Unzip in your webroot. Rename the folder to **SuiteCRM**.

[Get the .sh install file](https://github.com/motaviegas/SuiteCRM_Script) developed by Chris for his 10 minute install [video](https://www.youtube.com/watch?v=eycqCChZ8nI).
Rename to **start.sh**

Run to give .sh file permission within the SuiteCRM folder:

	sudo chmod +x ./start.sh

<!--
	Not from video, probably don't need.
	sudo chmod -R 755 .
-->

Run and confirm the [steps below video](https://community.suitecrm.com/t/how-to-install-suitecrm-8-6-1-under-10-minutes/93252) occur.


	sudo ./start.sh

<!--
At some point, we'll see if it runs without sudo.

	./start.sh
-->

Take note of the user and password of the MariaDB database that will be requested.



Updating and installing essential packages...
The operation couldn’t be completed. Unable to locate a Java Runtime that supports apt.
Please visit http://www.java.com for information on installing Java.

The operation couldn’t be completed. Unable to locate a Java Runtime that supports apt.
Please visit http://www.java.com for information on installing Java.

Updating and installing PHP packages...
sudo: add-apt-repository: command not found
The operation couldn’t be completed. Unable to locate a Java Runtime that supports apt.
Please visit http://www.java.com for information on installing Java.

Configuring Apache Server...
sudo: a2enmod: command not found
sudo: systemctl: command not found
Disabling directory listing globally...
tee: /etc/apache2/conf-available/disable-directory-listing.conf: No such file or directory
<Directory /var/www/>
    Options -Indexes
</Directory>
sudo: a2enconf: command not found
Installing MariaDB...
The operation couldn’t be completed. Unable to locate a Java Runtime that supports apt.
Please visit http://www.java.com for information on installing Java.

Execute 'sudo mysql_secure_installation' manually after the script finishes.
Configuring main database...
ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)
ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)
Failed to create database CRM. Please check MySQL root permissions.


From steps below video:

When the .sh script finishes, run the cmd:

    sudo mysql_secure_installation


**Current error**

	Can't connect to local MySQL server through socket '/tmp/mysql.sock'

Is there a solution [in this post](https://community.suitecrm.com/t/suitecrm-8-install-problem-mysql-connection/83267/18)?
