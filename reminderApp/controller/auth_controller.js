const { Store } = require("express-session");
let database = require("../database");
// url encoded?


let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  // not working as intended
  // loginSubmit: (req, res) => {
  //   passport.authenticate("local", {
  //     successRedirect: "/reminders",
  //     failureRedirect: "/login",
  //   })
  // },
  
  admin: (req, res) => {
    res.render("auth/admin", { name: req.user.name });
  },


  registerSubmit: (req, res) => {
  },
};

module.exports = authController;
