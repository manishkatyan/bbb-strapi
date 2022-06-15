'use strict';

const crypto = require('hash.js');

module.exports = {
  url: 'https://api.asyncweb.io/0e76ab3d/bigbluebutton',
  secret: crypto.sha256().update('abc').digest('hex'),
  classParams: {
    className: 'Demo Class',
    moderatorAccessCode: Math.random().toString().substring(2, 6),
    viewerAccessCode: Math.random().toString().substring(2, 6),
    bbbSettings: {
      moderatorApproval: false,
      maxParticipants: 100,
      logoutURL: 'https://higheredlab.com/',
      allowModsToUnmuteUsers: false,
      lockSettingsDisablePrivateChat: false,
      logo: 'https://higheredlab.com/wp-content/uploads/hel.png',
      muteOnStart: false,
      'userdata-bbb_skip_check_audio': false,
      'userdata-bbb_listen_only_mode': true,
    },
  },
};
