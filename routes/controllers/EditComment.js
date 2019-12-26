const { validatePost } = require("../validators/validators");
const Boom = require("@hapi/boom");
const db = require("../../database/db");

const EditComment = async (ctx, next) => {
  // Authenticate the user
  const checkToken = await authToken(ctx);
  if (!checkToken) {
    return ctx.throw(Boom.forbidden("Unauthorized Token Unidentified."));
  }
  const { _id, post } = ctx.request.body;
  // Validate Post
  const validTweet = validatePost(post);
  if (!validTweet) {
    return ctx.throw(Boom.badRequest(validTweet.errorMessage));
  }
  await db("replies")
    .update("post", post)
    .where("_id", _id);
  ctx.body = { message: "Comment has been successfully updated!" };
  return ctx.body;
};

module.exports = EditComment;
