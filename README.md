<div align="center" width="150px">
  <img style="width: 120px; height: auto;" src="https://higheredlab.com/wp-content/uploads/hel.png" alt="highered-strapi" />
</div>
<div>
  <h1>BigBlueButton-Strapi</h1>
  
  [BigBlueButton](https://bigbluebutton.org/) is like-Zoom for online classes but at a much lower cost, with better analytics, and is open-source.
  
  [Strapi](https://strapi.io/) is the leading open-source headless CMS. It’s 100% JavaScript, fully customizable and developer-first.
  
  The BigBlueButton-Strapi plugin enables you to integrate BigBlueButton into Strapi.
  
  <a href="https://www.npmjs.com/package/bigbluebutton-strapi">
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/manishkatyan/bbb-strapi?label=npm&logo=npm">
  </a>
  <a href="https://www.npmjs.org/package/bigbluebutton-strapi">
    <img src="https://img.shields.io/npm/dm/bigbluebutton-strapi.svg" alt="Monthly download on NPM" />
  </a>
  
</div>

---

## ✨ Features

BigBlueButton offers you everything you need for your online classes: HD audio/video conference, whiteboard, chat, slides, polling, raise hand and breakout rooms. Specifically,

- **HD Video** Start online classes with HD video conferencing, public and private chat, whiteboard, poll, presentation and screen-sharing
- **Analytics** Get analytics including attendance, time used for audio and video chat by students, chat messages sent, activity score
- **Engagement Tools** Various tools to engage students including Raise hand, Emoji, Shared notes, Breakout rooms, Recording, and annotation
- **Branding** Build and promote your online classes with your brand, url, logo and theme
- **Data Privacy** Get complete control of your students’ data, without ever sharing with any 3rd party
- **Scale with ease** Use open-source load balancer with multiple BigBlueButton servers to teach 1000s of students simultaneously

<div style="margin: 20px 0" align="center">
  <img style="width: 100%; height: auto;" src="https://higheredlab.com/wp-content/uploads/bbb-class.gif" alt="bbb-class" /> <br/>
</div>

<br/>

## ⚙️ Versions

- **Strapi v4**

<br/>

## 🖐 Requirements

The requireemnts to install the BigBlueButton-Strapi plugin is same as those to install Strapi.

Please refer to the official Strapi installation requirement doc here: [Installation Requirements](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html).

**Minimum environment requirements**

- Node.js `>=14.x.x`
- NPM `>=6.x.x`

We are following the [official Node.js releases timelines](https://nodejs.org/en/about/releases/).

**Supported Strapi versions**:

- Strapi v4.1.2 (recently tested)
- Strapi v4.x

> The BigBlueButton-Strapi plugin is designed for **Strapi v4.x**. 
> 
>  It won't work with Strapi v3.x.
>  


## ⏳ Installation

(Use **npm** to install this plugin within your Strapi project (recommended). [Install npm with these docs](https://docs.npmjs.com/cli/v6/commands/npm-install).)

```bash
npm i bigbluebutton-strapi
```

After successful installation you've to build a fresh package that includes plugin UI. To archive that simply use:

```bash
# with npm
$ npm run build
$ npm run develop

# with npx
$ npx strapi  build
$ npx strapi  develop
```

or just run Strapi in the development mode with `--watch-admin` option:

```bash
# with npm
npm develop --watch-admin

# with npx
npx strapi develop --watch-admin
```

The **BigBlueButton** plugin should appear in the **Plugins** section of Strapi sidebar after you run app again.

Enjoy 🎉

## 🔧 Configuration

You can easily configure the plugin to connect with your BigBlueButton server. 

- Go to `Strapi Settings -> BIGBLUEBUTTON -> Configuration`. 
- On the configiration page, you can enter BigBlueButton URL and Secret. 
- Click on verify to ensure that the plugin is able to connect with your BigBlueButton server. 
- Click on save to save the BigBlueButton URL and Secret. 

In case you don't have a BigBlueButton server, you can create a [free trial account here](https://higheredlab.com/).

<div style="margin: 20px 0" align="center">
  <img style="width: 100%; height: auto;" src="https://higheredlab.com/wp-content/uploads/bbb-configuration.gif" alt="bbb-class" />
</div>


To complete the plugin setup, you would need to change the default plugin configuration file. Please add following code snippet in `config/plugins.js` file. 
If this file does not exist for your Strapi installation, please create it.

```js
module.exports = {
  // ...
  bigbluebutton: {
    enabled: true,
  },
  // ...
};
```

> _Note_
> Default configuration for your plugin is fetched from `config/plugins.js` or directly from the plugin itself.

## 📝 License

[MIT License](LICENSE.md) 

Copyright (c) [Asyncweb](https://higheredlab.com/).
