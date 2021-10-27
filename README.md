<p align="center">
  <img src="https://raw.githubusercontent.com/soroushchehresa/unsplash-wallpapers/master/cover.jpeg" width="100%" />
</p>
<div align="center">

# Look Wallpapers

<div>
  <!-- License -->
  <a href="https://github.com/soroushchehresa/unsplash-wallpapers/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/soroushchehresa/unsplash-wallpapers.svg" alt="LICENSE">
  </a>
  <!-- Downloads total -->
  <a href="https://github.com/soroushchehresa/unsplash-wallpapers/releases">
    <img src="https://img.shields.io/github/downloads/soroushchehresa/unsplash-wallpapers/total.svg" alt="total download">
  </a>
  <a href="https://github.com/soroushchehresa/unsplash-wallpapers/releases/latest">
    <img src="https://img.shields.io/github/downloads/soroushchehresa/unsplash-wallpapers/v1.1.0/total.svg" alt="latest download">
  </a>
  <a href="https://github.com/soroushchehresa/unsplash-wallpapers/releases/latest">
    <img src="https://img.shields.io/github/downloads/soroushchehresa/unsplash-wallpapers/v1.2.0/total.svg" alt="latest download">
  </a>
  <a href="https://github.com/soroushchehresa/unsplash-wallpapers/releases/latest">
    <img src="https://img.shields.io/github/downloads/soroushchehresa/unsplash-wallpapers/v1.3.0/total.svg" alt="latest download">
  </a>
</div>

</div>

<br />
<br />
  
A menubar application for Mac, Windows and Linux that brings stunning wallpapers from [Unsplash](https://unsplash.com) right to your desktop.
Works on macOS 10.12+, Windows 10+ and Linux.

This project is an unofficial cross-platform desktop application based on [Unsplash Wallpapers official application for Mac](https://unsplash.com/wallpaper#mac-app) with more features and better performance.

<br />


## Installation

[![platform](https://img.shields.io/static/v1.svg?label=Platform&message=Linux-64%20|%20macOS-64%20|%20Win-32%20|%20Win-64&style=for-the-badge)](https://github.com/soroushchehresa/unsplash-wallpapers/releases)


![](https://raw.githubusercontent.com/wiki/ryanoasis/nerd-fonts/screenshots/v1.0.x/mac-pass-sm.png)             |  ![](https://raw.githubusercontent.com/wiki/ryanoasis/nerd-fonts/screenshots/v1.0.x/windows-pass-sm.png)             |  ![](https://raw.githubusercontent.com/wiki/ryanoasis/nerd-fonts/screenshots/v1.0.x/linux-pass-sm.png)
:--------------------------------------:|:------------------------------------------:|:------------------------------------------:
[![latest version](https://img.shields.io/github/downloads/soroushchehresa/unsplash-wallpapers/latest/Unsplash-Wallpapers-1.3.0.dmg.svg)](https://github.com/soroushchehresa/unsplash-wallpapers/releases/download/v1.3.0/Unsplash-Wallpapers-1.3.0.dmg) <br /><br /> <img src="http://i.imgur.com/EORtx07.gif" width="500px" />   | [![latest version](https://img.shields.io/github/downloads/soroushchehresa/unsplash-wallpapers/latest/Unsplash-Wallpapers-Setup-1.3.0.exe.svg)](https://github.com/soroushchehresa/unsplash-wallpapers/releases/download/v1.3.0/Unsplash-Wallpapers-Setup-1.3.0.exe) <br /><br /> <img src="http://i.imgur.com/ky4KhH9.gif" width="500px" />  |  [![latest version](https://img.shields.io/github/downloads/soroushchehresa/unsplash-wallpapers/latest/Unsplash-Wallpapers-1.3.0.AppImage.svg)](https://github.com/soroushchehresa/unsplash-wallpapers/releases/download/v1.3.0/Unsplash-Wallpapers-1.3.0.AppImage) <br /><br /> <img src="http://i.imgur.com/lBDtKrc.gif" width="500px" /> |

<br />

## Features
* Load high-quality wallpapers based on Unsplash popular categories.
* Cloud-hosted builds (Based on GitHub releases).
* Work on all popular operating systems like macOS, Windows and Linux.
* Wallpapers history list.
* Automatic set wallpapers hourly, daily, weekly and manual (optional).
* Run at startup system (Optional).
* Dark mode (Optional or auto by OS).
* Download directly ability for each wallpaper.

<br />

## Technologies
* [Electron](https://github.com/electron)
* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reduxjs/redux)
* [immutable-js](https://github.com/immutable-js/immutable-js)
* [redux-saga](https://github.com/redux-saga/redux-saga)
* [styled-components](https://github.com/styled-components/styled-components)
* [Axios](https://github.com/axios/axios)
* [Wallpaper](https://github.com/sindresorhus/wallpaper)
* [electron-json-storage](https://github.com/electron-userland/electron-json-storage)
* [Flow](https://github.com/facebook/flow)
* [ESLint - Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

<br />

## Let's run

#### 1. Clone the project:
```bash
$ git clone https://github.com/soroushchehresa/unsplash-wallpapers.git unsplash-wallpapers
```

#### 2. Add Unsplash access key:
Place Your [Unsplash access key](https://unsplash.com/documentation#authorization) as `UNSPLASH_ACCESS_KEY` in `.env` file.
Place Your [Wallhaven access key](https://wallhaven.cc/help/api) as `WALLHAVEN_ACCESS_KEY` in `.env` file.


#### 3. Start:

Development
```bash
$ yarn && yarn dev

# OR

$ npm i && npm run dev
```

Production
```bash
$ yarn && yarn package-all

# OR

$ npm i && npm run package-all
```

<br />

## Support
<a href="https://www.patreon.com/soroushchehresa">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>
