const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN
  ? JSON.parse(process.env.ALLOWED_ORIGIN)
  : ["*"];
module.exports = {
  PORT,
  MONGODB_URI,
  ALLOWED_ORIGIN
};
