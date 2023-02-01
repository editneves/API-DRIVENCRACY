import joi from 'joi'

export const PollSchema = joi.object({
  title: joi.string().required(),
  expireAt: joi.string().required(),
})


