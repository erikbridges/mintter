const authToken = require("../auth/auth");
const Boom = require("@hapi/boom");
const { validatePost } = require("../validators/validators");
const randomString = require("randomstring");

const CreateTweet = async (ctx, next) => {
  // Authenticate the user
  const checkToken = await authToken(ctx);
  if (!checkToken) {
    return ctx.throw(Boom.forbidden("Unauthorized Token Unidentified."));
  }
  const { post } = ctx.request.body;
  const validPost = validatePost(post);
  const newPost = {
    _id: randomString.generate({
      length: 12,
      charset: "hex"
    }),
    author: checkToken.token._id,
    post: validPost.post,
    replies: [],
    likes: 0,
    num_replies: 0
  };
  await db("posts").insert(newPost);
  // Validate Post
  ctx.body = { message: "Tweet has been created" };
  return ctx.body;
};

module.exports = CreateTweet;
