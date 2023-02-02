import db from "../config/dataBase.js";
import { pollSchema } from "../schema/PollSchema.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function listPoll(req, res) {
  try {
    const data = await db.collection("poll").find().toArray();
    return res.send(data);
  } catch (error) {
    res.status(500).send("Deu algo errado no servidor");
  }
}
//Se expireAt for vazio deve ser considerado 30 dias de enquete por padrão.
export async function registeredPoll(req, res) {
  
  const poll = req.body;
  try {
    await db.collection("poll").insertOne(poll);
    res.status(201).send(poll);
  } catch (err) {
    console.log(err);
    res.status(500).send("Deu algo errado no servidor");
  }
}
// Se a enquete já estiver expirado deve retornar erro com status 403.
export async function registeredChoice(req, res) {
  
  const choice = req.body;
  try {
    const pollExist = await db
      .collection("poll")
      .findOne({ title: choice.title });
    if (pollExist)
      return res.status(404).send("Essa opção de enquete já existe!");

    const choiceExist = await db
      .collection("choice")
      .findOne({ title: choice.title });
    if (choiceExist)
      return res.status(409).send("Essa opção de voto já existe!");

    await db.collection("choice").insertOne(choice);
    res.status(201).send(choice);
  } catch (err) {
    console.log(err);
    res.status(500).send("Deu algo errado no servidor");
  }
}

export async function getPollById(req, res) {
  const { id } = req.params;
  const date = await db.collection("poll").findOne({ _id: ObjectId(id) });

  if (!date) {
    res.status(404).send("Não existe essa enquete");
  }
  return res.send(date);
}

const now = dayjs();
// Verificar se é uma opção existente, se não existir retornar 404.
// Não pode ser registrado se a enquete já estiver expirado, retornar erro 403.
export async function registeredVoto(req, res) {
  const { id } = req.params;
  // _id do registred choice
  try {
    const date = await db
      .collection("choice")
      .insertOne({
        choiceId: ObjectId(id),
        createdAt: dayjs(now).format("HH:mm:ss"),
      });
    return res.status(201);
  } catch (err) {
    console.log(err);
    res.status(500).send("Deu algo errado no servidor");
  }
}


