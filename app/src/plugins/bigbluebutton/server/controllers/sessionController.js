module.exports = ({ strapi }) => ({

    async find(ctx) {
        params = ctx.query
        res = await strapi.query("plugin::bigbluebutton.session").findMany({ where: { params } })
        ctx.body = res;
    },
    async findOne(ctx) {
        const { id } = ctx.params
        res = strapi.query("plugin::bigbluebutton.session").findOne({ where: { id } });
        ctx.body = res;
    },
    async create(ctx) {
        await strapi.query("plugin::bigbluebutton.session").create({ data: ctx.request.body })
        ctx.body = ctx.request.body
    },
    async delete(ctx) {
        const { id } = ctx.params
        await strapi.query("plugin::bigbluebutton.session").delete({ where: { id } })
        ctx.body = { message: "succuss" }
    },
});