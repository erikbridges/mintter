const db = require("../../database/db");
const Boom = require("@hapi/boom");

const Follow = async (ctx, next) => {
  const { _id, following_id } = ctx.request.body;
  // Authenticate the user
  const checkToken = await authToken(ctx);
  if (!checkToken) {
    return ctx.throw(Boom.forbidden("Unauthorized Token Unidentified."));
  }
  const followAdd = {
    user_target: _id,
    following_id
  };

  await db("followers").insert(followAdd);

  ctx.body = { message: "Following user successfully" };
  return ctx.body;
};

module.exports = Follow;
