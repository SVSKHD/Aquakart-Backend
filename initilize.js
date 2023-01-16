const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const { readdirSync } = require("fs");
const fileUpload = require("express-fileupload");


//Server initlize
const Server = express();

//Swagger
const SwaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
Server.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));

//midllewares
Server.use(morgan("dev"));
Server.use(express.json());
Server.use(express.urlencoded({ extended: true }));
Server.use(bodyParser.json({ limit: "2mb" }));
Server.use(cookieParser());
Server.use(cors());
Server.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temporary",
  })
);

//routes
Server.get("/api", (req, res) => {
  res.json({ "hello server": "hello working" });
});
//user api routes
readdirSync("./CommonUsers/routes/").map((r) =>
   Server.use("/api", require("./CommonUsers/routes/" + r))
);
readdirSync("./Crm/routes/").map((r) =>
  Server.use("/crm", require("./Crm/routes/" + r))
);
// readdirSync("./ECOM/routes").map((r) =>
//   Server.use("/api", require("./ECOM/routes/" + r))
// );

module.exports = Server;
