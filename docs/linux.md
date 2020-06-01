# The City of Truro Mariners - Managment Console for Linux

## How to download the program:

To download the program for Linux visit [here](https://thecityoftruromariners.futurelucas4502.co.uk/release/index) and simply press download for linux

## How to run the program for Linux:

On linux you get an AppImage the idea is that an AppImage will work on any linux system whether it runs with debian or not it works like a portable application that doesnt get installed.

To run an AppImage you will need to right click on it go to permissions and check it as executable then simply double click the file!

**Note**: If the app is on your desktop gnome and some other desktop environments won't allow it to be run so you would have to view the desktop folder in nautilus and double click the application from there

## What if the app does nothing when I double click it:

This can happen on some distributions of linux where the chrome-sandboxing feature is not given the correct permissions. To check if this is the problem for you simply:

1. Open a terminal in the same folder as the AppImage and type: <br />
    `./The-City-Of-Truro-Mariners---Management-Console.AppImage`

If you get this response:
    `The SUID sandbox helper was found, but is not configured correctly...`

Then your OS fails to give the sandbox the correct permissions when running however we can disbale the sandbox when we run the application by doing the following:

1. Give the AppImage the correct permissions (this only needs to be done once on the file):
  i. Open the terminal in the same folder as the AppImage and run: <br />
    `sudo chmod a+x ./The-City-Of-Truro-Mariners---Management-Console.AppImage`
2. Then to launch the application run this (this has to be done every time unless you create a [shortcut](#how-to-create-a-shortcut-if-using-no-sandbox-method)): <br />
    `./The-City-Of-Truro-Mariners---Management-Console.AppImage --no-sandbox`

If that wasn't the response you get feel free to open a bug report/issue on github [here](https://github.com/futurelucas4502/management_console/issues).

### How to create a shortcut if using --no-sandbox method:

1. Move the AppImage to anywhere you want it. (in this example it will be in the same folder as the shortcut)
2. Next open terminal and run: <br />
    `>Management-Console.sh`
3. Open the file you just make using: <br />
    `sudo nano Management-Console.sh` <br />
or you can open it in any text editor you want
4. Then copy paste this code: <br />
    `#!/bin/bash` <br />
    `./The-City-Of-Truro-Mariners---Management-Console.AppImage --no-sandbox` <br />
5. Then save by pressing ctrl+x then y then enter if using nano
6. Then if using gnome you may need to run: <br />
    `gsettings set org.gnome.nautilus.preferences executable-text-activation 'launch'`
7. Then right click on Management-Console.sh go to the permissons tab and mark it as executable
8. Double-click and enjoy!


## How to use the program:

See [here](https://futurelucas4502.github.io/docs/index.html?docs=management_console&page=how-to-use)

## Not using Linux:

If your OS is not Linux see the links below:

* [Windows](https://futurelucas4502.github.io/docs/index.html?docs=management_console&page=windows "Windows Docs") 32/64 bit
* [macOS](https://futurelucas4502.github.io/docs/index.html?docs=management_console&page=macos "macOS Docs")

If your OS or architecture isn't in the above list e.g. windows ARM don't worry you can learn how to build it for your OS [here](https://futurelucas4502.github.io/docs/index.html?docs=management_console&page=unsupported "Unsupported OS").
