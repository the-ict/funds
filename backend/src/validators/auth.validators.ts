import Joi from "joi"

export const loginSchema = Joi.object({
    phone: Joi.string().required(),
})

export const verifySchema = Joi.object({
    phone: Joi.string().required(),
    code: Joi.string().required(),
})

