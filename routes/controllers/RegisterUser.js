const Boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");
const randomString = require("randomstring");
const sgMail = require("@sendgrid/mail");
const db = require("../../database/db");
const {
  validateNames,
  validateEmail,
  validatePassword,
  validateUsername,
  validatePost,
  isHuman
} = require("../validators/validators");

const RegisterUser = async (ctx, next) => {
  // Get the user's contents from the ctx
  const {
    firstName,
    lastName,
    email,
    username,
    bio,
    password,
    recaptchaValue
  } = ctx.request.body;
  // Google Captcha - Is this request sent by a human?
  // const human = isHuman(recaptchaValue);
  // if (!human) {
  //   return ctx.throw(Boom.badRequest("Recaptcha failed. Please try again."));
  // }
  // Check if a user with that email already exist
  const users = await db("users")
    .select("*")
    .where("email", email);

  // If a user already exists then we must end this request for security
  if (users.length !== 0) {
    return ctx.throw(
      Boom.forbidden("There is already a user with that email address.")
    );
  }
  // Check if a user with that username already exist
  const users = await db("users")
    .select("*")
    .where("username", username);

  // If a user already exists then we must end this request for security
  if (users.length !== 0) {
    return ctx.throw(
      Boom.forbidden("There is already a user with that username.")
    );
  }

  // Valid Checks
  const validChecks = [
    validateNames(firstName, "first_name"),
    validateNames(lastName, "last_name"),
    validateUsername(username),
    validatePost(bio), // <--- Its the same validation as the tweet posts
    await validateEmail(email),
    validatePassword(password),
    ctx.request.file.location == undefined
      ? { error: true, errorMessage: "No profile Image" }
      : true
  ];
  // Find one that is invalid and return the error message
  const validError = validChecks.find(item => item.error);
  // If there is an error then return the error message to the user.
  if (validError) {
    ctx.body = validError;
    return ctx.body;
  }
  // Generate Password using bcrypt
  const hash = await bcrypt.hash(password, 12);
  // Generate Valid Token
  const validToken = randomString.generate({
    length: 8,
    charset: "hex"
  });
  // Generate User
  const newUser = {
    _id: randomString.generate({
      length: 7,
      charset: "hex"
    }),
    first_name: firstName,
    last_name: lastName,
    profile_image: ctx.request.file.location,
    username,
    email,
    hash,
    bio,
    is_valid: false,
    valid_token: validToken
  };
  // ONLY USE WHEN THERE IS INTERNET
  // Send Validation token to email
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const secureMessage = {
    to: email,
    from: "admin@mintter.com",
    subject: "Security Code from Mintter: DO NOT REPLY",
    text: `Hi, to activate your account copy and paste this code on the activation menu in the login page: ${validToken} `
  };
  await sgMail.send(secureMessage);

  // Add to the database
  await db("users").insert(newUser);

  ctx.body = newUser;
  return ctx.body;
};

module.exports = RegisterUser;
