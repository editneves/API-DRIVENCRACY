import db from "../config/dataBase.js";
import { pollSchema } from "../schema/PollSchema.js";

export async function listPoll(req, res) {
  try {
    const data = await db.collection("poll").find().toArray();

    console.log(data);

    return res.send(data);
  } catch (error) {
    res.status(500).send("Deu algo errado no servidor");
  }
}

export async function registeredPoll(req, res) {
    const {title , expireAt } = req.body

  try {
    await db.collection("poll").insertOne({title,expireAt});

    // console.log(newPoll);
    // return res.status(201).send(newPoll);
    res.status(201).send("Usuário cadastrado com sucesso!")
  } catch (err) {
    console.log(err);
    res.status(500).send("Deu algo errado no servidor");
  }
}
