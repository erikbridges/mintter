const bcrypt = require("bcryptjs");
const Boom = require("@hapi/boom");
const authToken = require("../auth/auth");
const db = require("../../database/db");
const {
  validatePost,
  validateNames,
  validateEmail,
  validatePassword,
  validateUsername,
  isHuman
} = require("../validators/validators");

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
  // const human = isHuman(recaptchaValue);
  // if (!human) {
  //   return ctx.throw(Boom.badRequest("Recaptcha failed. Please try again."));
  // }
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
      // Validate First Name
      const validFirst = validateNames(firstName, "first_name");
      if (!validFirst) {
        return ctx.throw(Boom.badRequest(validFirst.errorMessage));
      }
      // Change First Name
      await db("users")
        .update("first_name", firstName)
        .where(_id, targetUser[0]._id);
      ctx.body = { message: "First name successfully updated" };
      return ctx.body;
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
      // Validate Last Name
      const validLast = validateNames(lastName, "last_name");
      if (!validLast) {
        return ctx.throw(Boom.badRequest(validLast.errorMessage));
      }
      // Change Last Name
      await db("users")
        .update("last_name", lastName)
        .where(_id, targetUser[0]._id);
      ctx.body = { message: "Last name successfully updated" };
      return ctx.body;
    }
    case "bio": {
      const { bio, password } = ctx.request.body;
      const passwordIsSame = await comparePassword(
        targetUser[0].hash,
        password
      );
      if (!passwordIsSame) {
        return ctx.throw(Boom.badRequest("Invalid password combination"));
      }
      // Validate Biography
      const validBio = validatePost(bio);
      if (!validBio) {
        return ctx.throw(Boom.badRequest(validBio.errorMessage));
      }
      // Change Bio
      await db("users")
        .update(bio, validBio.post)
        .where(_id, targetUser[0]._id);
      ctx.body = { message: "Bio successfully updated" };
      return ctx.body;
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
      // Validate Email
      const validEmail = await validateEmail(email);
      if (!validEmail) {
        return ctx.throw(Boom.badRequest(validEmail.errorMessage));
      }
      // Change Email
      await db("users")
        .update("email", email)
        .where(_id, targetUser[0]._id);
      ctx.body = { message: "Email successfully updated" };
      return ctx.body;
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
      // Validate Username
      const validUsername = await validateUsername(username);
      if (!validUsername) {
        return ctx.throw(Boom.badRequest(validUsername.errorMessage));
      }
      // Change Username
      await db("users")
        .update("username", username)
        .where(_id, targetUser[0]._id);

      ctx.body = { message: "Username successfully updated" };
      return ctx.body;
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
      if (
        ctx.request.file.location == undefined ||
        ctx.request.file.location == null
      ) {
        return ctx.throw(
          Boom.badRequest("Cannot update an image that is empty!")
        );
      }
      // Change Profile Image
      await db("users")
        .update("profile_image", ctx.request.file.location)
        .where(_id, targetUser[0]._id);
      ctx.body = { message: "Profile Image successfully updated" };
      return ctx.body;
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
      // Validate Password
      const validPass = await validatePassword(newpassword);
      if (!validPass) {
        return ctx.throw(Boom.badRequest(validPass.errorMessage));
      }

      // Change Password
      const hash = await bcrypt.hash(newpassword, 12);
      await db("users")
        .update("password", hash)
        .where(_id, targetUser[0]._id);
      ctx.body = { message: "Password successfully updated" };
      return ctx.body;
    }
    default: {
      return ctx.throw(Boom.badRequest("editWhich cannot be left blank"));
    }
  }
};

module.exports = EditUser;
