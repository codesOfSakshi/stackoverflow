/* -------------------------------------------------------------------------- */
/*                                  immports                                  */
/* -------------------------------------------------------------------------- */

/* ------------------------------ import paths ------------------------------ */
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("./config/config");
const user = require("./controllers/user");
const question = require("./controllers/questions");

require("./models/tag.js")


/* ---------------------------- importing routes ---------------------------- */
const testAPI = require("./routes/testRoute");
const userRoute = require("./routes/userRoute");
const admin = require("./routes/admin");
const tag = require("./routes/tag");
const tagRoute = require('./routes/tag.route');
const messageRoute = require('./routes/message.route');

/* -------------------------------------------------------------------------- */
/*                               start of config                              */
/* -------------------------------------------------------------------------- */
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use(
  cors({
    origin: config.config.baseURL,
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

/* -------------------------------------------------------------------------- */
/*                            connecting to mongoDB                           */
/* -------------------------------------------------------------------------- */

// const mongoURI =
//   "mongodb+srv://user1:user1@cluster0.olc4f.mongodb.net/stackover?retryWrites=true&w=majority";
// const mongoURI = `mongodb://127.0.0.1:27017/stackoverflow`;

const mongoURI = "mongodb+srv://anupriya:anupriya123@cluster0.nfuhn.mongodb.net/stackoverflow?retryWrites=true&w=majority";
let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 500,
  wtimeoutMS: 2500,
};

mongoose.connect(mongoURI, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log(`MongoDB Connection Failed`);
  }
});

mongoose.connection.on("connecting", () => {
  console.log(
    "connecting to mongoDB...and the readyState is",
    mongoose.connection.readyState
  );
});
mongoose.connection.on("connected", () => {
  console.log(
    "connected to mongoDB...and the readyState is",
    mongoose.connection.readyState
  );
});
mongoose.connection.on("disconnecting", () => {
  console.log(
    "disconnecting to mongoDB...and the readyState is",
    mongoose.connection.readyState
  );
});
mongoose.connection.on("disconnected", () => {
  console.log(
    "disconnected to mongoDB...and the readyState is",
    mongoose.connection.readyState
  );
});

/* -------------------------------------------------------------------------- */
/*                                    APIs                                    */
/* -------------------------------------------------------------------------- */

/* ---------------------- sample api to test the server --------------------- */
app.use("/", testAPI);

/* ------------------------------- actual APIs ------------------------------ */
app.use("/api/user", userRoute);
app.use("/api/user", user);
app.use("/api/admin", admin);
app.use("/api/tag", tag)
app.use('/api/questions',question);
app.use('/api/tags', tagRoute);
app.use('/api/messages', messageRoute);
