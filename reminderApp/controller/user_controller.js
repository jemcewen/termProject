const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

const getUserByGitHubIdOrCreate = (profile) => {
  let user = getUserById(profile.id);
  if(user)
  {
    return user;
  }
  else {
    user = {
      id: profile.id,
      name: profile.name,
      email: profile.email
    }
  }
  userModel.addGitHubUser(user);
  return user;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGitHubIdOrCreate
};
