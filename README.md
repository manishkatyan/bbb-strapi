<p align="center">
  <img src="https://higheredlab.com/wp-content/uploads/hel.png" alt="highered-strapi" width="300" height="150" />
</p>

<div align="center">
  <h1> BigBlueButton-strapi</h1>
  <p>
Start Online Classes on BigBlueButton
</p>
  
</div>

 <!-- This plugin is still a work in progress -->

## Requirements

This plugin requires the following, in order to work correctly:

- Strapi v4 (this plugin is not compatible with v3)
- BigBlueButton server

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
  bigbluebutton: {
    enabled: true,

  },
  // ...
};
```

## BigBlueButton Configuration

> Goto Setting > BigBlueButton > Configuration

<img src="assets/bbb-configuration.png" alt="highered-strapi" width="300" height="150" />

- Enter BigBlueButton Url and Secret.
- click on verify, if the given Url and Secret is valid it will be verified successfully, otherwise check with entered details.
- click on Save.


## Features

- Create new classes.
- Moderator easily start classes by one click.
- Invite students by clicking on invite button,which has BigBlueButton Url and acess code to join.
  - Access code is mandatory to student join the class.
