const bcrypt = require("bcryptjs");
const Boom = require("@hapi/boom");
const authToken = require("../auth/auth");
const db = require("../../database/db");
const comparePassword = async (userPass, password) => {
  const isSame = await bcrypt.compare(userPass, password);
  if (!isSame) {
    return false;
  }
  return true;
};

const EditUser = async (ctx, next) => {
  // Authenticate the user
  const checkToken = await authToken(ctx);
  if (!checkToken) {
    return ctx.throw(Boom.forbidden("Unauthorized Token Unidentified."));
  }
  const { _id, editWhich } = ctx.request.body;
  const targetUser = await db("users")
    .select("*")
    .where("_id", _id);

  switch (editWhich) {
    case "first_name": {
      const { firstName, password } = ctx.request.body;
      const passwordIsSame = await comparePassword(
        targetUser[0].hash,
        password
      );
      if (!passwordIsSame) {
        return ctx.throw(Boom.badRequest("Invalid password combination"));
      }
      // Change First Name
      await db("users")
        .update("first_name", firstName)
        .where(_id, targetUser[0]._id);
      ctx.body = { message: "First name successfully updated" };
    }
    case "last_name": {
      const { lastName, password } = ctx.request.body;
      const passwordIsSame = await comparePassword(
        targetUser[0].hash,
        password
      );
      if (!passwordIsSame) {
        return ctx.throw(Boom.badRequest("Invalid password combination"));
      }
      // Change Last Name
      await db("users")
        .update("last_name", lastName)
        .where(_id, targetUser[0]._id);
      ctx.body = { message: "Last name successfully updated" };
    }
    case "email": {
      const { email, password } = ctx.request.body;
      const passwordIsSame = await comparePassword(
        targetUser[0].hash,
        password
      );
      if (!passwordIsSame) {
        return ctx.throw(Boom.badRequest("Invalid password combination"));
      }
      // Check if there is an account with the same email
      const users = await db("users")
        .select("*")
        .where("email", email);

      // If a user already exists then we must end this request for security
      if (users.length !== 0) {
        return ctx.throw(
          Boom.forbidden("There is already a user with that email address.")
        );
      }
      // Change Email
      await db("users")
        .update("email", email)
        .where(_id, targetUser[0]._id);
      ctx.body = { message: "Email successfully updated" };
    }
    case "username": {
      const { username, password } = ctx.request.body;
      const passwordIsSame = await comparePassword(
        targetUser[0].hash,
        password
      );
      if (!passwordIsSame) {
        return ctx.throw(Boom.badRequest("Invalid password combination"));
      }
      // Check if there is an account with the same email
      const users = await db("users")
        .select("*")
        .where("username", username);

      // If a user already exists then we must end this request for security
      if (users.length !== 0) {
        return ctx.throw(
          Boom.forbidden("There is already a user with that username")
        );
      }
      // Change Email
      await db("users")
        .update("username", username)
        .where(_id, targetUser[0]._id);

      ctx.body = { message: "Username successfully updated" };
    }
    case "profile_image": {
      const { password } = ctx.request.body;
      const passwordIsSame = await comparePassword(
        targetUser[0].hash,
        password
      );
      if (!passwordIsSame) {
        return ctx.throw(Boom.badRequest("Invalid password combination"));
      }
      // Change Password
      await db("users")
        .update("profile_image", ctx.request.file.location)
        .where(_id, targetUser[0]._id);
      ctx.body = { message: "Password successfully updated" };
    }
    case "password": {
      const { newpassword, password } = ctx.request.body;
      const passwordIsSame = await comparePassword(
        targetUser[0].hash,
        password
      );
      if (!passwordIsSame) {
        return ctx.throw(Boom.badRequest("Invalid password combination"));
      }

      // Change Password
      const hash = await bcrypt.hash(newpassword, 12);
      await db("users")
        .update("password", hash)
        .where(_id, targetUser[0]._id);
      ctx.body = { message: "Password successfully updated" };
    }
    default: {
      return ctx.throw(Boom.badRequest("editWhich cannot be left blank"));
    }
  }
};

module.exports = EditUser;
