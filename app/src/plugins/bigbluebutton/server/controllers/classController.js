var generateUID = require("randomstring");

module.exports = ({ strapi }) => ({
    async find(ctx) {
        params = ctx.query
        res = await strapi.query("plugin::bigbluebutton.class").findMany({where: params}, {populate:true})
        ctx.body = res;
    },
    async findOne(ctx) {
        const { id } = ctx.params
        res = await strapi.query("plugin::bigbluebutton.class").findOne({ id, populate: true });
        ctx.body = res
    },
    async update(ctx) {
        const { id } = ctx.params
        res = await strapi.query("plugin::bigbluebutton.class").findMany({ id }, { data: ctx.request.body, populate: true })
        ctx.body = res;
    },
    async create(ctx) {
        const uid = generateUID({length: 4, charset: 'alphabetic'} )
        params =  ctx.request.body
        params.uid = uid
        res = await strapi.query("plugin::bigbluebutton.class").create({ data: params, populate: true })
        ctx.body = res
    },
    async delete(ctx) {
        const { id } = ctx.params
        await strapi.query("plugin::bigbluebutton.class").delete({ where: { id } })
        await strapi.query("plugin::bigbluebutton.session").delete({ where: { 'class': { id } } })
        ctx.body = { message: "succuss" }
    },
});