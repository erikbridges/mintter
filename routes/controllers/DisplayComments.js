const db = require("../../database/db");
const Boom = require("@hapi/boom");

const displayComments = async (ctx, next) => {
  const { commentWhich, _id } = ctx.response.body;
  // Authenticate the user
  const checkToken = await authToken(ctx);
  if (!checkToken) {
    return ctx.throw(Boom.forbidden("Unauthorized Token Unidentified."));
  }
  if (commentWhich == "top_comments") {
    const displayMainComments = await db("replies")
      .select("*")
      .where("post_target", _id)
      .andWhere("response_to", null);

    ctx.body = displayMainComments;
    return ctx.body;
  } else if (commentWhich == "reply_comments") {
    let response_id = ctx.request.body;
    const displayReplyComment = await db("replies")
      .select("*")
      .where("post_target", _id)
      .andWhere("response_to", response_id);
    ctx.body = displayReplyComment;
    return ctx.body;
  } else {
    return ctx.throw(Boom.badRequest("You cannot leave commentwhich is blank"));
  }
};

module.exports = displayComments;
