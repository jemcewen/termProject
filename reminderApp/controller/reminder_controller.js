let database = require("../database");

let remindersController = {
  list: (req, res) => {
    const reminders = database[req.user.id].reminders;
    res.render("reminder/index", { reminders: reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    const reminders = database[req.user.id].reminders;

    let reminderToFind = req.params.id;
    let searchResult = reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: reminders });
    }
  },

  create: (req, res) => {
    const reminders = database[req.user.id].reminders;
    let reminder = {
      id: reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    const reminders = database[req.user.id].reminders;
    let reminderToFind = req.params.id;
    let searchResult = reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    const reminders = database[req.user.id].reminders;

    let reminder = {
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      completed: (req.body.completed == "true")
    };

    let reminderToUpdate = req.params.id;
    let searchResult = reminders.find(function (reminder) {
      return reminder.id == reminderToUpdate;
    });

    let index = reminders.indexOf(searchResult);
  
    reminders[index] = reminder;
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    const reminders = database[req.user.id].reminders;
    let reminderToDelete = req.params.id;
    let searchResult = reminders.find(function (reminder) {
      return reminder.id == reminderToDelete;
    });
    let index = reminders.indexOf(searchResult);
    reminders.splice(index, 1);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
