const Joi = require('joi');

const userValidate = data => {
    const userSchema = Joi.object({
        email: Joi.string().pattern(new RegExp('gmail.com$')).email().lowercase().require(),
        password: Joi.string().min(4).max(32).require()
    })
    return userSchema.validate(date)
}

module.exports {
    userValidate
}