const db = require("../../database/db");
const Boom = require("@hapi/boom");

const Follow = async (ctx, next) => {
  const { following_id } = ctx.request.body;
  // Authenticate the user
  const checkToken = await authToken(ctx);
  if (!checkToken) {
    return ctx.throw(Boom.forbidden("Unauthorized Token Unidentified."));
  }

  await db("followers")
    .del()
    .where("following_id", following_id);

  ctx.body = { message: "Following user successfully" };
  return ctx.body;
};

module.exports = Follow;
