import {
    listPoll,
    registeredPoll,
    registeredChoice,
    getPollByIdChoice,
    registeredVoto,
    getPollByIdResult,
  } from "../controller/Poll.js"
  import { Router } from 'express'
  import { validateSchema } from "../middleware/validateSchema.js"
  import {choiceSchema} from "../schema/PollSchema.js"

  const pollRouter = Router()
  
  pollRouter.get("/poll", listPoll)
  pollRouter.post("/poll",  registeredPoll)
  pollRouter.post("/choice", validateSchema(choiceSchema), registeredChoice)
  pollRouter.get("/poll/:id/choice", getPollByIdChoice)
  pollRouter.post("/choice/:id/vote", registeredVoto)
  pollRouter.get("/poll/:id/result", getPollByIdResult)
 
  export default pollRouter