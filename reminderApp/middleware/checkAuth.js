module.exports = {
    ensureAuthenticated: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect("/login");
    },
    forwardAuthenticated: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect("/reminders");
    },
    forwardAdmin: function(req, res, next) {
      if(req.user != null) {
        let role = req.user.role;
        if(role == 'admin') {
          return next();
        }
      }
      res.redirect("/reminders");
    }
  };
  