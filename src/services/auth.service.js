const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    next(error)
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    next(error)
  }
};

module.exports = {
  hashPassword,
  comparePassword
};