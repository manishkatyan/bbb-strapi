const path = require("path");
const fs = require("fs-extra");
const koaStatic = require("koa-static");
const _ = require("lodash");

module.exports = ({ strapi }) => ({
  async find(ctx) {
    params = ctx.query;
    res = await strapi
      .query("plugin::bigbluebutton.class")
      .findMany({ populate: true });
    ctx.body = res;
  },
  async findOne(ctx) {
    const { uid } = ctx.params;
    res = await strapi
      .query("plugin::bigbluebutton.class")
      .findOne({ where: { uid }, populate: true });
    ctx.body = res;
  },

  async invite(ctx, next) {
    const { uid } = ctx.params;
    const classdata = await strapi
      .query("plugin::bigbluebutton.class")
      .findOne({
        where: { uid },
      });

    const layout = fs.readFileSync(
      path.resolve(__dirname, "..", "public", "index.html"),
      "utf8"
    );

    const filledLayout = _.template(layout)({
      uid: uid,
      className: classdata.className,
      backendUrl: strapi.config.server.url,
    });

    const layoutPath = path.resolve(
      strapi.dirs.extensions,
      "bigbluebutton",
      "public",
      "index.html"
    );
    await fs.ensureFile(layoutPath);
    await fs.writeFile(layoutPath, filledLayout);

    ctx.url = path.basename(`${ctx.url}/index.html`);
    const staticFolder = path.resolve(
      strapi.dirs.extensions,
      "bigbluebutton",
      "public"
    );
    return koaStatic(staticFolder)(ctx, next);
  },

  async update(ctx) {
    const { id } = ctx.params;
    res = await strapi
      .query("plugin::bigbluebutton.class")
      .findone({ id }, { data: ctx.request.body, populate: true });
    ctx.body = res;
  },
  async create(ctx) {
    params = ctx.request.body;
    const slug = await strapi
      .plugin("bigbluebutton")
      .service("uidService")
      .generateUIDField({
        contentTypeUID: "plugin::bigbluebutton.class",
        field: "uid",
        data: params,
      });

    params.uid = slug;

    res = await strapi
      .query("plugin::bigbluebutton.class")
      .create({ data: params, populate: true });
    ctx.body = res;
  },
  async delete(ctx) {
    const { id } = ctx.params;
    const sessions = await strapi
      .query("plugin::bigbluebutton.session")
      .findMany({ where: { class: { id } } });
    sessions.forEach(async (session) => {
      await strapi
        .query("plugin::bigbluebutton.session")
        .delete({ where: { id: session.id } });
    });
    await strapi.query("plugin::bigbluebutton.class").delete({ where: { id } });
    ctx.body = { message: "succuss" };
  },
});
