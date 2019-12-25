const Koa = require("koa");
const json = require("koa-json");
const helmet = require("koa-helmet");
const cors = require("koa-cors");
const errorHandler = require("koa-better-error-handler");
const router = require("./routes/router");
const bearerToken = require("koa-bearer-token");
const serve = require("koa-static");
const { historyApiFallback } = require("koa2-connect-history-api-fallback");
const chalk = require("chalk");
require("dotenv").config();
const app = new Koa();

// Add Error Handler
app.context.onerror = errorHandler;

// Middleware (Plugins)
app
  .use(json())
  .use(helmet())
  .use(serve("uploads"))
  .use(
    cors({
      methods: ["GET", "POST", "PATCH", "DELETE"]
    })
  )
  .use(bearerToken())
  .use(router.allowedMethods())
  .use(router.routes());

// PORT (FOR SERVER)
const PORT = process.env.PORT || 5000;

if (process.env.MODE == "production") {
  app
    .use(historyApiFallback({ whiteList: ["/api", "/uploads"] }))
    .use(serve(__dirname + "/client/build"));
}

// Listening

const server = app.listen(PORT, () =>
  console.log(
    chalk.blue.bold("Listening on port ") + chalk.black.bgYellow(PORT)
  )
);

// For Testing With Jest
module.exports = server;
