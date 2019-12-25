const Boom = require("@hapi/boom");
const authToken = require("../auth/auth");
const db = require("../../database/db");
const bcrypt = require("bcrypt");

const DeleteUser = async (ctx, next) => {
  const { _id, password } = ctx.request.body;
  // Authenticate the user
  const checkToken = await authToken(ctx);
  if (!checkToken) {
    return ctx.throw(Boom.forbidden("Unauthorized Token Unidentified."));
  }
  // Check to see if the password matches 
  const targetUser = await db("users").select("*").where("_id", _id);
  const comparePass = await bcrypt.compare(password, targetUser[0].hash);
  if (!comparePass) {
    return ctx.throw(Boom.forbidden("Invalid password combination."));
  }
  // Delete the user
  await db("users")
    .del()
    .where("_id", _id);
  ctx.body = { message: "User has been successfully deleted" };
  return ctx.body;
};

module.exports = DeleteUser;
