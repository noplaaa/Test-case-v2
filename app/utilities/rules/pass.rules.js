const passRules = function (value) {
  const Uppercase = /[A-Z]/.test(value)
  const Lowercase = /[a-z]/.test(value)
  const Digit = /\d/.test(value)

  if (!(Uppercase && Lowercase && Digit)) {
    return {
      status: 403,
      message: 'Password must include uppercase, lowercase, and numbers'
    }
  }

  if (value.length < 8) {
    return {
      status: 403,
      message: 'Password must be at least 8 characters long'
    }
  }

  return true
}

module.exports = passRules