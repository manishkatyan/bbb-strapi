module.exports = ({ strapi }) => ({
    async find(ctx) {
        params = ctx.query
        res = await strapi.query("plugin::bigbluebutton.class").findMany({ where: { params } })
        ctx.body = res;
    },
    // need to fix the bug: Not getting any results
    async findOne(ctx) {
        const { id } = ctx.params
        res = strapi.query("plugin::bigbluebutton.class").findOne({ where: { id } });
        ctx.body = res
    },
    async create(ctx) {
        await strapi.query("plugin::bigbluebutton.class").create({ data: ctx.request.body })
        ctx.body = ctx.request.body
    },
    async delete(ctx) {
        const { id } = ctx.params
        await strapi.query("plugin::bigbluebutton.class").delete({ where: { id } })
        await strapi.query("plugin::bigbluebutton.class").delete({ where: { 'class': id } })

        ctx.body = { message: "succuss" }
    },
});