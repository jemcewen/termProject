const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const app = express();
const path = require("path");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const { ensureAuthenticated, forwardAuthenticated} = require("./middleware/checkAuth");
const passport = require("./middleware/passport");
const session = require("express-session");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

// Routes start here

app.get("/reminders", ensureAuthenticated, reminderController.list);

app.get("/reminder/new", reminderController.new);

app.get("/reminder/:id", reminderController.listOne);

app.get("/reminder/:id/edit", reminderController.edit);

app.post("/reminder/", reminderController.create);

app.post("/reminder/update/:id", reminderController.update);

app.post("/reminder/delete/:id", reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/register", authController.register);
app.get("/login", forwardAuthenticated, authController.login);

// authController.loginSubmit is not working as intended
//app.post("/login", authController.loginSubmit);

app.post('/login', 
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/login",
  })
);

app.get('/github',
  passport.authenticate("github")
);

app.get('/github/callback',
  passport.authenticate("github"),
  function(req, res) {
    res.redirect('/reminders');
  }
);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
