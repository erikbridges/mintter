const Boom = require("@hapi/boom");
const authToken = require("../auth/auth");
const db = require("../../database/db");
const { validateQuery } = require("../validators/validators");

const Search = async (ctx, next) => {
  const { query } = ctx.request.body;
  const checkToken = await authToken(ctx);
  if (!checkToken) {
    return ctx.throw(Boom.forbidden("Unauthorized Token Unidentified."));
  }
  const isValidQuery = validateQuery(query);
  if (isValidQuery.error) {
    return ctx.throw(isValidQuery.errorMessage);
  }
  await db("users")
    .select("*")
    .where("username", query);
};
module.exports = Search;
