const db = require("../../database/db");
const Boom = require("@hapi/boom");

const Follow = async (ctx, next) => {
  // Authenticate the user
  const checkToken = await authToken(ctx);
  if (!checkToken) {
    return ctx.throw(Boom.forbidden("Unauthorized Token Unidentified."));
  }

  const followList = await db("followers")
    .select("*")
    .where("user_target", checkToken.token._id);
  const numberOfFollowers = followList.length; 
  // Get each the followers information and put it into an array
  let followers = []; 
  followList.forEach(item => {
      const Usertarget = await db("users").select("*").where("_id", item.following_id)
      // Get everything but, the sensitive information
      followers.push({...Usertarget, bio: undefined, email: undefined, hash: undefined, is_valid: undefined, valid_token: undefined, forgot_token: undefined})
  });

  ctx.body = { followers, numberOfFollowers};
  return ctx.body;
};

module.exports = Follow;
