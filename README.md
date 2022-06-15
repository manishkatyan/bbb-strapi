<div align="center">
   <img alt="bigbluebutton" width="60" src="https://higheredlab.com/wp-content/uploads/hel_icon.png" />
</div>
<h1 align="center">BigBlueButton-Strapi</h1>
<p align="center">Integrate online classes into Strapi CMS via BigBlueButton open-source video conferencing.</p>
<p align="center">This free plugin also provides API end-points to easily setup start and join buttons for web conferencing into any frontend app.</p>

<br />

<p align="center">
 <a href="https://www.npmjs.com/package/bigbluebutton-strapi">
<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/manishkatyan/bbb-strapi?label=npm&logo=npm">
</a>
<a href="https://www.npmjs.org/package/bigbluebutton-strapi">
<img src="https://img.shields.io/npm/dm/bigbluebutton-strapi.svg" alt="Monthly download on NPM" />
</a>
<a href="https://github.com/manishkatyan/bbb-strapi/actions/workflows/ci.yml/badge.svg">
<img src="https://github.com/manishkatyan/bbb-strapi/actions/workflows/ci.yml/badge.svg" alt="CI Status" />
</a>
<a href="https://github.com/manishkatyan/bbb-strapi/actions/workflows/eslint.yml/badge.svg">
<img src="https://github.com/manishkatyan/bbb-strapi/actions/workflows/eslint.yml/badge.svg" alt="EsLint" />
</a>
</p>

<br>

<img style="width: 100%; height: auto;" src="/static/bigbluebutton-strapi.gif" alt="bbb-class" /> <br/>

<br/>

# BigBlueButton plugin for Strapi

[BigBlueButton](https://bigbluebutton.org/) is like-Zoom for online classes but at a much lower cost, with better analytics, and is open-source.

[Strapi](https://strapi.io/) is the leading open-source headless CMS. It’s 100% JavaScript, fully customizable and developer-first.

The BigBlueButton-Strapi plugin enables you to integrate BigBlueButton into Strapi.

<br/><br/>

## ✨ Features

BigBlueButton offers you everything you need for your online classes: HD audio/video conference, whiteboard, chat, slides, polling, raise hand and breakout rooms. Specifically,

- **HD Video** Start online classes with HD video conferencing, public and private chat, whiteboard, poll, presentation and screen-sharing
- **Analytics** Get analytics including attendance, time used for audio and video chat by students, chat messages sent, activity score
- **Engagement Tools** Various tools to engage students including Raise hand, Emoji, Shared notes, Breakout rooms, Recording, and annotation
- **Branding** Build and promote your online classes with your brand, url, logo and theme
- **Data Privacy** Get complete control of your students’ data, without ever sharing with any 3rd party
- **Scale with ease** Use open-source load balancer with multiple BigBlueButton servers to teach 1000s of students simultaneously

<br/><br/>

## 🖐 Requirements

The requireemnts to install the BigBlueButton-Strapi plugin is same as those to install Strapi.

Please refer to the official Strapi installation requirement doc here: [Installation Requirements](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html).

**Minimum environment requirements**

- Node.js `>=14.x.x`
- NPM `>=6.x.x`

We are following the [official Node.js releases timelines](https://nodejs.org/en/about/releases/).

**Supported Strapi versions**:

- Strapi v4.1.12 (recently tested)
- Strapi v4.x

> The BigBlueButton-Strapi plugin is designed for **Strapi v4.x**. It won't work with Strapi v3.x.

<br/><br/>

## ⏳ Installation

Use **npm** to install this plugin within your Strapi project (recommended).

[Refer to this doc to install npm](https://docs.npmjs.com/cli/v6/commands/npm-install)

```bash
npm i bigbluebutton-strapi
```

After successful installation you would need to build a fresh package that includes the BigBlueButton-Strapi plugin UI. Please execute the commands below:

```bash
# with npm (option 1)
$ npm run build
$ npm run develop

# with npx (option 2)
$ npx strapi  build
$ npx strapi  develop
```

The **BigBlueButton-Strapi** plugin should appear in the **Plugins** section of Strapi sidebar after you run app again.

Now you are ready to launch your onlie classes 🎉

<br/><br/>

## 🔧 Configuration

You can replace the default BigBlueButton URL and Secret with your own server details.

- Click on `Configure Your BigBlueButton URL and Secret`.
- On the configuration page, you can test with the default BigBlueButton URL and Secret. Later on, you can provide your own server details.
- Click on the Save button to verify the server connection and save it.

In case you don't have a BigBlueButton server, you can create a [free trial account here](https://higheredlab.com/).

<br/><br/>
<img style="width: 100%; height: auto;" src="/static/bigbluebutton-strapi-config.gif" alt="bigbluebutton-strapi-config" />
<br/><br/>

<br/>

## 📝 License

[MIT License](LICENSE.md)

Copyright (c) [HigherEdLab.com](https://higheredlab.com/).
