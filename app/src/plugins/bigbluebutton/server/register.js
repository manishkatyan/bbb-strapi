"use strict";
const path = require("path");
const fs = require("fs-extra");
const _ = require("lodash");

const staticFileMiddleware = require("./middlewares/staticFiles");
module.exports = async ({ strapi }) => {
  // registeration phase
  await staticFileMiddleware({ strapi });
  await generateJs();

  // const ConfigVar = await strapi
  //   .store({
  //     environment: "",
  //     type: "plugin",
  //     name: "bigbluebutton",
  //     key: "config",
  //   })
  //   .get();

  // const pluginStore = strapi.store({ type: "plugin", name: "bigbluebutton" });

  // const ConfigVar = await pluginStore.get();

  // const configVar = strapi.config.get("plugin.bigbluebutton");
};

async function generateJs() {
  const jsData = fs.readFileSync(
    path.resolve(__dirname, "public", "bbb.js"),
    "utf8"
  );
  const filledJsData = _.template(jsData)({
    backendUrl: strapi.config.server.url,
  });

  const bbbJsPath = path.resolve(
    strapi.dirs.extensions,
    "bigbluebutton",
    "public",
    "bbb.js"
  );
  await fs.ensureFile(bbbJsPath);
  await fs.writeFile(bbbJsPath, filledJsData);
}
