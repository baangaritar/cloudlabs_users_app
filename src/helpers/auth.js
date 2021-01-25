const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    console.log("Hola");
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Not Authorized.');
  res.redirect('/users/sign_in');
};

module.exports = helpers;