import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import PollRoutes from "./routes/PollRoutes.js"
dotenv.config();

const app = express()
app.use(express.json())
app.use(cors())

app.use([PollRoutes])

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Servidor funcionando na porta: ${port}`));
