const db = require("../../database/db");
const Boom = require("@hapi/boom");

const deleteReply = async (ctx, next) => {
  const { _id } = ctx.request.body;
  // Authenticate the user
  const checkToken = await authToken(ctx);
  if (!checkToken) {
    return ctx.throw(Boom.forbidden("Unauthorized Token Unidentified."));
  }
  await db("replies")
    .del()
    .where("_id", _id);

  ctx.body = { message: "Comment has been deleted." };
  return ctx.body;
};

module.exports = deleteReply;
