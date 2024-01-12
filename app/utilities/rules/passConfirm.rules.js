const passConfirmRules = {
  validator: function (pass, pass_confirm) {
      if (pass !== pass_confirm) {
          throw { status: 403, message: "Confirm password doesn't match" }
      }
      return true
  },
};

module.exports = passConfirmRules