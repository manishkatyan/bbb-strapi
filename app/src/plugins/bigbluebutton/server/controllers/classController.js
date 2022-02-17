const generateUID = require("randomstring");

module.exports = ({ strapi }) => ({
    async find(ctx) {
        params = ctx.query
        res = await strapi.query("plugin::bigbluebutton.class").findMany({ populate: true })
        ctx.body = res;
    },
    async findOne(ctx) {
        const { id } = ctx.params
        res = await strapi.query("plugin::bigbluebutton.class").findOne({ id, populate: true });
        ctx.body = res
    },
    async update(ctx) {
        const { id } = ctx.params
        res = await strapi.query("plugin::bigbluebutton.class").findone({ id }, { data: ctx.request.body, populate: true })
        ctx.body = res;
    },
    async create(ctx) {
        const uid = generateUID.generate({ length: 4, charset: 'alphabetic' })
        params = ctx.request.body
        params.uid = uid
        params.bbbId = `${params.className.replace(/[\W_]/g, "_")}_${uid}`
        res = await strapi.query("plugin::bigbluebutton.class").create({ data: params, populate: true })
        ctx.body = res
    },
    async delete(ctx) {
        const { id } = ctx.params
        const sessions = await strapi.query("plugin::bigbluebutton.session").findMany({ where: { 'class': { id } } })
        sessions.forEach(async (session) => {
            await strapi.query("plugin::bigbluebutton.session").delete({ where: { id: session.id } })
        });
        await strapi.query("plugin::bigbluebutton.class").delete({ where: { id } })
        ctx.body = { message: "succuss" }
    },
});