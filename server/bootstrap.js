/* eslint-disable node/no-missing-require */
/* eslint-disable node/no-extraneous-require */
'use strict';
const path = require('path');
const fs = require('fs-extra');
const crypto = require('hash.js');
const bbbConfig = require('./bigbluebuttonConfig');
const demoClass = require('./demoClass');

module.exports = async ({ strapi }) => {
  // bootstrap phase
  setUrlAndSecret(strapi);
  createDemoClass(strapi);
};

const setUrlAndSecret = async strapi => {
  const pluginStore = strapi.store({ type: 'plugin', name: 'bigbluebutton' });

  const url = await pluginStore.get({ key: 'url' });
  if (!url) {
    await strapi
      .plugin('bigbluebutton')
      .service('bbbService')
      .setUrlAndScret(bbbConfig.url, bbbConfig.secret);
  }
};

const createDemoClass = async strapi => {
  if (!demoClass.isDemoClassCreated) {
    const slug = await strapi.plugin('bigbluebutton').service('uidService').generateUIDField({
      contentTypeUID: 'plugin::bigbluebutton.class',
      field: 'uid',
      data: bbbConfig.classParams,
    });
    bbbConfig.classParams.uid = slug;
    bbbConfig.classParams.meetingId = crypto
      .sha256()
      .update(`${slug}${Date.now() / 1000}`)
      .digest('hex');

    await strapi
      .query('plugin::bigbluebutton.class')
      .create({ data: bbbConfig.classParams, populate: true });
    demoClass.isDemoClassCreated = true;
    const demoClassPath = path.resolve(__dirname, 'demoClass.json');
    fs.writeFile(demoClassPath, JSON.stringify(demoClass, null, 2)),
      function writeJSON(err) {
        if (err) return err;
      };
  }
};
