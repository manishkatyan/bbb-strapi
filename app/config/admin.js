module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'c6c1bf16e1d35dc2872aa4f84dacbd84'),
  },
});
