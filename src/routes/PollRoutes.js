import {
    listPoll,
    registeredPoll,
  } from "../controller/Poll.js"
  import { Router } from 'express'
  import { validateSchema } from "../middleware/validateSchema.js"
  import { PollSchema } from '../schema/PollSchema'

  const PollRouter = Router()
  
  PollRouter.get("/poll", listPoll)
  recipiePoll.post("/poll", validateSchema(PollSchema), registeredPoll)
  
  export default PollRouter