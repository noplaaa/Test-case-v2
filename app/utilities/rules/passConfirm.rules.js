const passConfirmRules = {
  validator: function (pass, pass_confirm) {
    if (pass !== pass_confirm) {
      return { status: 403, message: "Confirm password doesn't match", isValid: false };
    }
    return { status: 201, isValid: true };
  }
};

module.exports = passConfirmRules;