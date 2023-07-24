import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    publishKeyStripe: process.env.PUBLIC_KEY_STRIPE,
  },
});
