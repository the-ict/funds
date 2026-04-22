import joi from "joi";

export const createTransactionSchema = joi.object({
  amount: joi.number().required(),
  type: joi.string().required(),
  description: joi.string().optional(),
  user_id: joi.string().required(),
});

export const updateTransactionSchema = joi.object({
  amount: joi.number().optional(),
  type: joi.string().optional(),
  description: joi.string().optional(),
  user_id: joi.string().optional(),
}).min(1);
