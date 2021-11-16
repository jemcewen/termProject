let database = require("../database");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  /*  I could not get this function to work here
  loginSubmit: (req, res) => {
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "/login",
    })
  },
  */

  registerSubmit: (req, res) => {
    // implement
  },
};

module.exports = authController;
