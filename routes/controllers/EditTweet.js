const { validatePost } = require("../validators/validators");
const Boom = require("@hapi/boom");
const db = require("../../database/db");

const EditTweet = async (ctx, next) => {
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
  await db("posts")
    .update("post", post)
    .where("_id", _id);
  ctx.body = { message: "Post has been successfully updated!" };
  return ctx.body;
};

module.exports = EditTweet;
