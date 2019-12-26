const db = require("../../database/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isHuman } = require("../../validators/validators");
const Boom = require("@hapi/boom");

const matchUserAction = async (matchedUser, loginCredent) => {
  // Check if the passwords are the same
  const isSame = await bcrypt.compare(loginCredent.password, matchedUser.hash);
  if (!isSame) {
    return { error: true, errorMessage: "Invalid username, email or password" };
  }

  // Generate a jwt token
  const token = jwt.sign(
    {
      ...matchedUser,
      hash: undefined
    },
    process.env.JWT_SECRET,
    { expiresIn: "5h" }
  );

  return { token };
};

const LoginUsers = async (ctx, next) => {
  // Check if this is a human
  const human = isHuman(recaptchaValue);
  if (!human) {
    return ctx.throw(Boom.badRequest("Recaptcha failed. Please try again."));
  }
  // Get the username or the email of from the user
  const loginCredent = {
    username:
      ctx.request.body.username === undefined
        ? undefined
        : ctx.request.body.username,
    email:
      ctx.request.body.email === undefined ? undefined : ctx.request.body.email,
    password: ctx.request.body.password
  };
  // Find a user with that username if the user decided to go with a username
  if (loginCredent.username) {
    const usernameList = await db("users")
      .select("*")
      .where("username", loginCredent.username);
    // If there is a match then go for it
    const match = matchUserAction(usernameList[0], loginCredent);
    if (match.error) {
      return ctx.throw(match.errorMessage);
    }
  }
  // If it is an email then find a user with that email.
  if (loginCredent.email) {
    const emailList = await db("users")
      .select("*")
      .where("email", loginCredent.email);
    const match = matchUserAction(emailList[0], loginCredent);
    if (match.error) {
      return ctx.throw(match.errorMessage);
    }
  }
};

module.exports = LoginUsers;
