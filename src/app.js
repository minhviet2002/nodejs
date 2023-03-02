const express = require("express");
const app = express();
const port = 8000;
const storage = require("node-persist");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const path = require("path");
const route = require("./routes/index.js");
const database = require("./config/connect-db/index");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { log } = require("console");
//Cookies Parser
app.use(cookieParser());
//Session
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
// method override -> support PUT, PATCH, DELETE, etc in http-request
app.use(methodOverride("_method"));

//config file static
app.use(express.static(path.join(__dirname, "public")));
// Khởi tạo storage
storage.init({ dir: "path/to/save", ttl: false });
// HTTP logger
app.use(morgan("combined"));
// custom
const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

// Template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      formatCurrency: (price) => VND.format(price),
      ifeq: (a, b, options) => {
        if (a == b) {
          return options.fn(this);
        }
        return options.inverse(this);
      },
      ifnoteq: (a, b, options) => {
        if (a != b) {
          return options.fn(this);
        }
        return options.inverse(this);
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

//Route
route(app);

// Connect dataabase
database.connect();

// connnect port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
