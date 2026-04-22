import joi from "joi";

export const createCategorySchema = joi.object({
  name: joi.string().required(),
  type: joi.string().required(),
  user_id: joi.string().required(),
});

export const updateCategorySchema = joi.object({
  name: joi.string().optional(),
  type: joi.string().optional(),
  user_id: joi.string().optional(),
}).min(1);
