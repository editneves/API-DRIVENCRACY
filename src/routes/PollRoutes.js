import {
    listPoll,
    registeredPoll,
  } from "../controller/Poll.js"
  import { Router } from 'express'
  import { validateSchema } from "../middleware/validateSchema.js"
  import {pollSchema} from "../schema/PollSchema.js"

  const pollRouter = Router()
  
  pollRouter.get("/poll", listPoll)
  pollRouter.post("/poll", validateSchema(pollSchema), registeredPoll)
  
  export default pollRouter