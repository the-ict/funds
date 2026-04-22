import joi from "joi";

export const createUserSchema = joi.object({
  name: joi.string().required(),
  tg_username: joi.string().required(),
  tg_id: joi.number().required(),
  phone: joi.string().required(),
});

export const updateUserSchema = joi.object({
  name: joi.string().optional(),
  tg_username: joi.string().optional(),
  tg_id: joi.number().optional(),
  phone: joi.string().optional(),
}).min(1);