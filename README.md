

<p align="center">
  <img src="https://higheredlab.com/wp-content/uploads/hel.png" alt="highered-strapi" width="300" height="150" />
</p>

<div align="center">
  <h1>Strapi v4 - BigBlueButton</h1>
  <p>
A Strapi plugin for BigBlueButton, allowing you to create and join classes from Strapi CMS
</p>
  
</div>

 <!-- This plugin is still a work in progress -->

## Requirements

This plugin requires the following, in order to work correctly:

- Strapi v4 (this plugin is not compatible with v3)

## Installation

```bash
# with npm
$ npm i bigbluebutton-strapi

```

After successful installation you have to build a fresh package that includes plugin UI:

```bash
# with npm
$ npm run build && npm run develop

```

## Plugin Configuration

> Add the following configuration in the following files `config/plugins.js`

```js
module.exports = {
  // ...
  bigbluebutton-strapi: {
    enabled: true,

  },
  // ...
};
```

## BigBlueButton Configuration

> Goto Setting > BigBlueButton > Configuration

<img src="/assets/bbb-configuration.png" alt="highered-strapi" width="300" height="150" />

- Enter BigBlueButton Url and Secret.
- click on Save.

> Note: BigBlueButton Url and Secret should be valid one, to start or join the classes.

## Features

- Integrate your BigBlueButton like moodle,using BigBlueButton url and secret.
- Create online classes easily.
- Moderator easily start classes by one click.
- Invite students clicking on invite button,which has BigBlueButton Url and acess code to join.
  - Access code is mandatory to student join the class.

