const db = require("../../database/db");

const DeleteTweet = async () => {
  const { _id } = ctx.request.body;
  await db("posts")
    .del()
    .where("_id", _id);
};

module.exports = DeleteTweet;
