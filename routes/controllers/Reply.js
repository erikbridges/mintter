const db = require("../../database/db");
const randomString = require("randomstring");
const { validatePost } = require("../validators/validators");
const Boom = require("@hapi/boom");
const authToken = require("../auth/auth");

const Reply = async (ctx, next) => {
  const { post_id, post, _id } = ctx.request.body;
  const checkToken = await authToken(ctx);
  if (!checkToken) {
    return ctx.throw(Boom.forbidden("Unauthorized Token Unidentified."));
  }
  const isValidPost = validatePost(post);
  await db("replies").insert({
    _id: randomString.generate({
      length: 5,
      charset: "hex"
    }),
    post_target: post_id,
    author: checkToken.token._id,
    response_to: _id,
    like: 0,
    replies: 0,
    deleted_account: false,
    post: isValidPost.post
  });
};

module.exports = Reply;
