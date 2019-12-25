const validator = require("validator");
const fetch = require("node-fetch");
const Filter = require("bad-words");
const filter = new Filter({ placeHolder: "" });
const GoogleRecaptcha = require("google-recaptcha");
const googleRecaptcha = new GoogleRecaptcha({
  secret: process.env.GOOGLE_PRIVATE
});

module.exports = {
  validateNames: function(name, typeName) {
    // Check if it is a first name or last name
    // Min 2 max of 30. Must be a letter no special chars or numbers
    const isValidLength = validator.matches(
      name,
      /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,30}$/
    );
    if (!isValidLength) {
      return {
        error: true,
        errorMessage:
          typeName == "first_name"
            ? "Not a valid first name"
            : "Not a valid last name"
      };
    }
    return true;
  },
  validateEmail: async function(email) {
    // Check if the email has an @ (.com .org .net etc are allowed)
    const isEmail = validator.matches(
      email,
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    // NOTE: NO INTERNET ---PLEASE UNCOMMENT WHEN INTERNET RETURNS---
    const resp = await fetch(`https://disposable.debounce.io/?email=${email}`);
    const isFake = await resp.json();
    if (isFake.disposable == true) {
      return { error: true, errorMessage: "Not a real email address." };
    }
    if (!isEmail) {
      return { error: true, errorMessage: "Not a valid email address." };
    } else {
      return true;
    }
  },
  validateUsername: function(username) {
    /* At least 3, max fo 20 chars.
      Must begin with a letter,
      2 special characters optional (only _-.),  Cannot start with them
    */
    const isUsername = validator.matches(
      username,
      /^(?!.*[-_]{2,})(?=^[^-_].*[^-_]$)[\w\s-]{3,20}$/
    );
    if (!isUsername) {
      return { error: true, errorMessage: "Not a valid username." };
    } else {
      return true;
    }
  },
  validatePassword: function(password) {
    // Min 8 max of 50.
    // Minimum eight characters, at least one letter, one number and one special character:
    const isPassword = validator.matches(
      password,
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,50}$/
    );
    if (!isPassword) {
      return { error: true, errorMessage: "Not a valid password." };
    } else {
      return true;
    }
  },
  validatePost: function(post) {
    // Check the post length.
    const isLength = validator.isLength(post, { min: 3, max: 140 });
    if (!isLength) {
      return { errorMessage: "Post is too long or too short." };
    }
    // Remove any profanity if any and sanitize the post from bad html.
    return { post: filter.clean(post) };
  },
  isHuman: function(item) {
    const isReqHuman = googleRecaptcha.verify({ response: item }, error => {
      if (error) {
        return false;
      }

      return true;
    });
    return isReqHuman;
  }
};
