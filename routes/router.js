const Router = require("koa-router");
const router = new Router({ prefix: "/api" });

/* USER CONTROLLERS
______________________________*/
const LoginUser = require("./controllers/LoginUsers");
const Register = require("./controllers/RegisterUser");
const EditUser = require("./controllers/EditUser");
const DeleteUser = require("./controllers/DeleteUser");

/* TWEET CONTROLLERS
____________________________*/
const CreateTweet = require("./controllers/CreateTweet");
const ShowTweetsById = require("./controllers/ShowTweetsById");

/* FOLLOW CONTROLLERS 
____________________________*/

/* REPLY CONTROLLERS COMMENT SYSTEM
_____________________________*/
/* Body Parser
____________________________*/
const bodyParser = require("koa-bodyparser");

/* Image Uploading
________________________*/
const multer = require("@koa/multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1"
});
const s3 = new aws.S3();

// Remember: use forms when handling files. JSON for no file upload

const fileFilter = function(req, file, cb) {
  // Only accept jpeg or png files
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// Only accepts files 5mb or under
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "mintter",
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  }),
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});

// LOGIN USER
router.post(
  "/login",
  bodyParser(),
  async (ctx, next) => await LoginUser(ctx, next)
);

// REGISTER USER
router.post(
  "/users",
  upload.single("profile_image"),
  async (ctx, next) => await Register(ctx, next)
);

// EDIT USER
router.patch(
  "/users",
  upload.single("profile_image"),
  async (ctx, next) => await EditUser(ctx, next)
);

// DELETE USER
router.delete(
  "/users",
  bodyParser(),
  async (ctx, next) => await DeleteUser(ctx, next)
);

// SEARCH (With A Random List of Recommended Users)
// SHOW TWEETS BY USER ID
router.get(
  "/posts/:id",
  bodyParser(),
  async (ctx, next) => await ShowTweetsById(ctx, next)
);

// CREATE TWEET
router.post(
  "/post",
  bodyParser(),
  async (ctx, next) => await CreateTweet(ctx, next)
);

// EDIT TWEET

// DELETE TWEET

module.exports = router;
