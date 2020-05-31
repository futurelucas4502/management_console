---
description: A management console made with Electron.JS for my Computer Science A-Level
show_downloads: true
github:
  is_project_page: true
  repository_url: https://github.com/futurelucas4502/management-console
  repository_name: management-console
  zip_url: https://github.com/futurelucas4502/management-console/zipball/master
  tar_url: https://github.com/futurelucas4502/management-console/tarball/master
---

# The City of Truro Mariners - Managment Console for unsupported OS's

So you want to use this application but your OS isn't supported well as long as your on a computer that can run nodejs and electronjs your in luck!

1. Install node.js this can be done via the snapstore if on linux or from [here](https://nodejs.org/en/download/) for other OS's. If you can't see node.js for your OS on the official website or don't know how to install it google is your friend!
2. Clone or download the repository from [here](https://github.com/futurelucas4502/management-console) (if using zip extract the zip file)
3. Open the folder that was cloned/extracted
4. Open a terminal in the folder and run: <br />
    `npm install`

On Linux you may get an error as 1 additional step is needed see [here](https://github.com/atom/node-keytar#on-linux).

5. Then run `npm build` for windows, or `npm run-script build` for linux or for macOS `npm run build`
6. Then change into the dist directory on windows you will have an exe, on mac a dmg and on linux an appimage file on other operating systems you may have something else and if you get an error or no end file you may need to change a very small amount of code in package.json but dont panic its easier than it sounds and requires no programming skills see [here](https://www.electron.build/configuration/configuration) for more information.