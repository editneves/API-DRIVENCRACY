import express from "express"
import cors from "cors"
import PollRoutes from "./routes/PollRoutes.js"


const app = express()
app.use(express.json())
app.use(cors())

app.use([PollRoutes])

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Servidor funcionando na porta: ${port}`));
