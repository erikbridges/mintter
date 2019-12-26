const db = require("../../database/db");
const ShowTweetsById = async (ctx, next) => {
  // Authenticate the user
  const checkToken = await authToken(ctx);
  if (!checkToken) {
    return ctx.throw(Boom.forbidden("Unauthorized Token Unidentified."));
  }
  const postList = await db("posts")
    .select("*")
    .where("author", checkToken.token._id);
  if (postList.length == 0) {
    ctx.body = { message: "The use hasn't created any posts" };
    return ctx.body;
  }
  ctx.body = postList;
  return ctx.body;
};

module.exports = ShowTweetsById;
