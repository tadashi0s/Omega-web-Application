const express = require("express"); //importing express
const path = require("path");
const app = express();
const hbs = require("hbs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
require("./db/connect");
const Userdata = require("./models/userdata");
const auth = require("./middleware/auth");

const port = process.env.PORT || 5000; // setting default port
const bcrypt = require("bcryptjs"); //securing password
// setting the path
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../Templates/views");
//middleware
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use(
  "/jq",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);
app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
// routing
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/sign", (req, res) => {
  res.render("sign");
});
// app.get("/Desktop", auth, (req, res) => {
//   res.render("Desktop");
// });
app.get("/logout", auth, async (req, res) => {
  try {
    req.user.token = req.user.token.filter((currentElement) => {
      return currentElement.token != req.token;
    });
    res.clearCookie("jwt");
    console.log("logout successfully");
    await req.user.save();
    res.render("login");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Sign-up form
app.post("/sign", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if (password === cpassword) {
      const userdata = new Userdata({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
      });
      const token = await userdata.generateAuthToken();
      console.log(token);
      res.cookie("jwt", token);
      const data = await userdata.save();
      console.log(token);

      res.status(201).render("Desktop");
    } else {
      res.send("passwords not matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login-up

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const logindata = await Userdata.findOne({ email: email });
    const passwordMatch = await bcrypt.compare(password, logindata.password);

    const token = await logindata.generateAuthToken();
    console.log(token);

    if (passwordMatch) {
      res.status(201).render("Desktop");
    } else {
      res.send("username/password not matching");
    }
  } catch (error) {
    res.send(404).send("Invalid Data");
  }
});

// sending request
app.listen(port, () => {
  console.log("server is running at port no ", port);
});
