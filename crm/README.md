[Profile Tools](../)
# SuiteCRM - Database Schema for Azure

<!-- Under Development - SQL table CREATE script for Azure -->

[SuiteCRM](https://SuiteCRM.com) provides a standardized partner admin [database schema](https://schema--suitecrm-docs.netlify.app/schema) with a [large developer community](https://community.SuiteCRM.com).

[Download version 8.7.1](https://suitecrm.com/wpfd_file/suitecrm-8-7-1/) or a more recent [download](https://suitecrm.com/download/) if a matching .sh file is available.
Unzip the download in your webroot. Rename the folder to **SuiteCRM**.

## Our quick install script for Mac, Windows and Linux

Summary of what's included for each OS within the start.sh script

| OS      | PHP            | Apache        | DB Option                     |
|---------|----------------|---------------|-------------------------------|
| Linux   | via apt        | via apt       | MariaDB                       |
| MacOS   | via brew       | via brew      | MariaDB                       |
| Windows | via Chocolatey | via Chocolatey| SQL Express / Azure / MariaDB |

<br>[Contact us](/dreamstudio/earth/) to collaborate using the database schema for "SQL Server Express / Azure"

[Get our .sh fork for Mac and Windows - SuiteCRM 8.7.1](https://github.com/ModelEarth/SuiteCRM_Script/blob/main/SCRM_8.7.1_0.1.4_MacWindowsLinux.sh)  
Created from the .sh script initially developed by Chris for his 10-minute [Linux install](https://github.com/motaviegas/SuiteCRM_Script) .sh file [video and steps](https://community.suitecrm.com/t/how-to-install-suitecrm-8-6-1-under-10-minutes/93252).  

Place in your local SuiteCRM folder and rename the file to **start.sh**

Open a terminal in your SuiteCRM folder and grant the start.sh file permission within the folder:

	sudo chmod +x ./start.sh

<!--
	Not from video, probably don't need.
	sudo chmod -R 755 .
-->

As you run the start.sh install, also follow the [steps below video](https://community.suitecrm.com/t/how-to-install-suitecrm-8-6-1-under-10-minutes/93252).

We're avoiding sudo here for better security:

	./start.sh

Take note of the user and password of the MariaDB database that will be requested.

**MacOS users** - You may need to run these if you have brew errors:

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


If you installed ImageMagick via Homebrew (which is common), you can safely press Enter to accept [autodetect], because the script will usually find it in the standard Homebrew location. Or use `brew --prefix imagemagick` to find it.

**From the steps below the video:**

[View steps](https://community.suitecrm.com/t/how-to-install-suitecrm-8-6-1-under-10-minutes/93252).

When the .sh script finishes successfully, run the cmd:<!-- sudo mysql_secure_installation -->

	mariadb-secure-installation

Most likely it needs to be:

	sudo mariadb-secure-installation

First enter your machine password, then blank for the MariaDB database's root password

Without making any additional changes, initial login response says:
You already have your root account protected, so you can safely answer 'n'.

However the steps under the video:

Switch to unix_socket authentication [Y/n] Y
Change the root password? [Y/n] y
put your DB root password and take note of it!!!
Remove anonymous users? [Y/n] Y
Disallow root login remotely? [Y/n] Y
Remove test database and access to it? [Y/n] Y
Reload privilege tables now? [Y/n] Y

Get "IP retrieved" displayed near the start of your start.sh terminal.

Mac webroot:
Default Apache port for Homebrew says "It works!"
[http://localhost:8080](http://localhost:8080)


The first time you may need to run `./start.sh` again, since database did not initially exist.

BUG: When running a second time, the webroot stopped working.

Probable cause(s) - These appear right before "Installing MariaDB":
PHP module not found. PHP may not work correctly with Apache.
✅ PHP handler configuration added.
✅ Directory listing disabled.


brew services start php@8.2

To enable PHP in Apache add the following to httpd.conf and restart Apache:
    LoadModule php_module /usr/local/opt/php@8.2/lib/httpd/modules/libphp.so

    <FilesMatch \.php$>
        SetHandler application/x-httpd-php
    </FilesMatch>

Finally, check DirectoryIndex includes index.php
    DirectoryIndex index.php index.html

The php.ini and php-fpm.ini file can be found in:
    /usr/local/etc/php/8.2/

php@8.2 is keg-only, which means it was not symlinked into /usr/local,
because this is an alternate version of another formula.

If you need to have php@8.2 first in your PATH, run:
  echo 'export PATH="/usr/local/opt/php@8.2/bin:$PATH"' >> ~/.zshrc
  echo 'export PATH="/usr/local/opt/php@8.2/sbin:$PATH"' >> ~/.zshrc

For compilers to find php@8.2 you may need to set:
  export LDFLAGS="-L/usr/local/opt/php@8.2/lib"
  export CPPFLAGS="-I/usr/local/opt/php@8.2/include"

To start php@8.2 now and restart at login:
  brew services start php@8.2

Or, if you don't want/need a background service you can just run:
  /usr/local/opt/php@8.2/sbin/php-fpm --nodaemonize
🔧 Updating PATH to use PHP 8.2...
Linking /usr/local/Cellar/php@8.2/8.2.28_1... 25 symlinks created.

If you need to have this software first in your PATH instead consider running:
  echo 'export PATH="/usr/local/opt/php@8.2/bin:$PATH"' >> ~/.zshrc
  echo 'export PATH="/usr/local/opt/php@8.2/sbin:$PATH"' >> ~/.zshrc


<!--
TODO: Create a get.sh file that automatically pulls the .sh file from GitHub, saves, renames to start.sh and runs the script.
-->

## About MacOS Install

1. PHP Installation & Configuration

Uses the existing install_php_macos function with better version checking
Properly configures php.ini with optimal settings for SuiteCRM


2. Apache (httpd) Installation & Configuration

Installs Apache via Homebrew
Configures necessary modules like mod_rewrite
Sets up PHP handling in Apache
Disables directory listing for security


3. MariaDB Database Setup

Installs MariaDB via Homebrew
Creates the CRM database with proper character set
Sets up database user with appropriate permissions
Includes verification steps


4. SuiteCRM Installation

Creates the document root directory
Downloads and extracts SuiteCRM
Sets proper ownership and permissions


5. Virtual Host Configuration

Creates a VirtualHost for the CRM
Uses port 8080 (default for Homebrew's httpd)
Sets up proper directory permissions and options


6. Final Configuration

Restarts services
Makes final permission adjustments
Provides user instructions for accessing the CRM


## Key Differences from Linux Implementation:

Uses Homebrew instead of apt for package management
Apache and MariaDB paths are different on macOS
User/group handling is specific to macOS
Apache runs on port 8080 by default with Homebrew


Further Improvements by Claude

1. Improved Error Handling

Added extensive error checking with descriptive messages throughout the script
Implemented proper exit conditions when critical operations fail
Added fallback mechanisms for common issues (e.g., trying paths for both Intel and Apple Silicon Macs)
Used the || operator to detect and handle command failures with appropriate messages

2. Security Enhancements

Updated database character set from utf8 to utf8mb4 for better Unicode support
Added security headers in Apache VirtualHost configuration
Configured more restrictive file permissions (750 for directories, 640 for files)
Enhanced PHP security settings (display_errors = Off, expose_php = Off)
Added explicit security reminders and recommendations

3. Reliability Improvements

Prevented running as root, explaining why it's not recommended on macOS
Created a more robust package installation function with better error handling
Added verification for services running before proceeding with dependent operations
Created backups of configuration files before modification
Added proper path detection for both Intel and Apple Silicon Macs

4. User Experience Improvements

Added more informative status messages with emoji indicators
Created a health check page for easy verification after installation
Added a detailed configuration summary at the end
Provided clearer instructions for post-installation steps
Implemented better progress indicators and meaningful success/failure notifications

5. Performance Optimizations

Added caching for SuiteCRM download (checking if already present before downloading)
Better organized package installation with dependency checking
Improved Apache configuration for better performance

6. macOS-Specific Improvements

Added proper detection of processor architecture (Intel vs Apple Silicon)
Properly handled Homebrew paths based on architecture
Better handling of permissions with appropriate sudo usage
Improved PHP module detection for Apache integration
Added proper checks for Homebrew PATH configuration

These improvements make the macOS implementation more robust, secure, and user-friendly, while still maintaining compatibility with the approach used in the Linux version. The script now handles the differences between Intel and Apple Silicon Macs more gracefully and provides better guidance throughout the installation process.


## Key Features of the Windows Implementation

Environment Prerequisites

Checks for Chocolatey and provides instructions if not installed
Defines standard paths for Apache, PHP, and document roots


Apache Installation & Configuration

Installs Apache HTTP Server via Chocolatey
Properly configures Apache to work with PHP
Enables the rewrite module for URL rewriting


PHP Configuration

Leverages the existing install_php_PC function
Configures php.ini with appropriate settings for SuiteCRM
Enables required PHP extensions


Database Installation & Setup

Installs MariaDB when not using --no-local-sql option
Creates the CRM database with proper character set
Sets up database user with appropriate permissions
Includes verification steps


SuiteCRM Installation

Creates directory structure
Downloads and extracts SuiteCRM
Sets proper permissions using Windows commands


Virtual Host Configuration

Creates a VirtualHost for the CRM
Sets up proper directory permissions and options
Disables directory listing for security


Service Management

Restarts Apache and ensures MariaDB is running
Provides guidance on firewall configuration


### Key Differences from Linux Implementation:

Uses Chocolatey instead of apt for package management
Handles Windows-specific file paths with proper escaping
Uses Windows-specific commands for permission management (icacls)
Provides Windows-specific service management commands

Windows-Specific Challenges Addressed:

Path handling in Windows (using forward slashes for compatibility with Git Bash)
Service management using Windows commands
Apache module configuration for Windows
Windows file permission handling
