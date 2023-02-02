import {
    listPoll,
    registeredPoll,
    registeredChoice,
    getPollById,
    registeredVoto,
  } from "../controller/Poll.js"
  import { Router } from 'express'
  import { validateSchema } from "../middleware/validateSchema.js"
  import {pollSchema,choiceSchema} from "../schema/PollSchema.js"

  const pollRouter = Router()
  
  pollRouter.get("/poll", listPoll)
  pollRouter.post("/poll", validateSchema(pollSchema), registeredPoll)
  pollRouter.post("/choice", validateSchema(choiceSchema), registeredChoice)
  pollRouter.get("/poll/:id/choice", getPollById)
  pollRouter.post("/choice/:id/vote", registeredVoto)
  
  
  export default pollRouter