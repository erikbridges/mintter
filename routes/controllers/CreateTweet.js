const authToken = require("../auth/auth");
const Boom = require("@hapi/boom");

const CreateTweet = (ctx, next) => {
  // Authenticate the user
  const checkToken = await authToken(ctx);
  if (!checkToken) {
    return ctx.throw(Boom.forbidden("Unauthorized Token Unidentified."));
  }
  const {post} = ctx.request.body;

  const newPost = {
      post: validPost
  }
  await db("posts").insert(newPost);
  // Validate Post 
    ctx.body = {message: "Tweet has been created"}
    return ctx.body;
}





module.exports = CreateTweet;