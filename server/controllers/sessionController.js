'use strict';
module.exports = ({ strapi }) => ({
  async find(ctx) {
    const res = await strapi.query('plugin::bigbluebutton.session').findMany({ populate: true });
    ctx.body = res;
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const res = strapi.query('plugin::bigbluebutton.session').findOne({ id, populate: true });
    ctx.body = res;
  },
  async create(ctx) {
    const res = await strapi
      .query('plugin::bigbluebutton.session')
      .create({ data: ctx.request.body, populate: true });
    ctx.body = res;
  },
  async delete(ctx) {
    const { id } = ctx.params;
    await strapi.query('plugin::bigbluebutton.session').delete({ where: { id } });
    ctx.body = { message: 'succuss' };
  },
});
