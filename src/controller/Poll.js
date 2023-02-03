import db from "../config/dataBase.js";
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

export async function registeredPoll(req, res) {
  const poll = req.body;

  if (!req.body.title) {
    res.status(422).send("O campo title é obrigatório");
  }

  try {
    const today = new Date();
    const priorDate = new Date(new Date().setDate(today.getDate() + 30));
    const todayAnother = dayjs(priorDate).format("YYYY-MM-DD HH:mm");

    if (!poll.expireAt) {
      console.log("ed", poll.expireAt);
      await db.collection("poll").insertOne({
        title: poll.title,
        expireAt: todayAnother,
      });
      return res.status(201).send("Enquete criada, data expira em 30 dias");
    }
    await db.collection("poll").insertOne(poll);
    return res.status(201).send("Enquete criada.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Deu algo errado no servidor");
  }
}

export async function registeredChoice(req, res) {
  const choice = req.body;

  const now = dayjs();
  try {
    const pollExpireAt = await db
      .collection("poll")
      .findOne({ _id: ObjectId(choice.pollId) });

    const today = new Date(Date.now());
    const dateExp = new Date(pollExpireAt.expireAt);
    //const trintaDias = 30*1000*60*60*24;
    // console.log(dateExp,today);

    if (dateExp < today) {
      console.log("expirou");
      return res.status(403).send("Enquete expirada!");
    }
    const pollExist = await db
      .collection("poll")
      .findOne({ title: choice.title });
    if (pollExist) {
      return res.status(404).send("Essa opção de enquete já existe!");
    }
    const choiceExist = await db
      .collection("choice")
      .findOne({ title: choice.title });
    if (choiceExist) {
      return res.status(409).send("Essa opção de voto já existe!");
    }
    await db.collection("choice").insertOne(choice);
    res.status(201).send(choice);
  } catch (err) {
    console.log(err);
    res.status(500).send("Deu algo errado no servidor");
  }
}

export async function getPollByIdChoice(req, res) {
  const { id } = req.params;
  try {
    const date = await db.collection("poll").findOne({ _id: ObjectId(id) });

    if (!date) {
      res.status(404).send("Não existe essa enquete");
    }
    const choices = await db.collection("choice").find({ pollId: id }).toArray();
    return res.send(choices);
  } catch (err) {
    console.log(err);
    res.status(500).send("Deu algo errado no servidor");
  }
}
const now = dayjs();
export async function registeredVoto(req, res) {
  const { id } = req.params;
  // _id do registred choice
  try {
    const chicePoll = await db
      .collection("choice")
      .findOne({ _id: ObjectId(id) });
    if (!chicePoll) {
      return res.status(404).send("A opção de voto não existe");
    }

    await db.collection("poll").findOne({ _id: ObjectId(id) });

    const today = new Date(Date.now());
    const dateExp = new Date(poll.expireAt);

    if (dateExp < today) {
      console.log("expirou");
      return res.status(403).send("Enquete expirada!");
    }

    await db.collection("choice").insertOne({
      choiceId: ObjectId(id),
      createdAt: dayjs(now).format("YYYY-MM-DD HH:mm"),
    });
    return res.status(201);
  } catch (err) {
    console.log(err);
    res.status(500).send("Deu algo errado no servidor");
  }
}

export async function getPollByIdResult(req, res) {
  const { id } = req.params;
  try{
    const date = await db.collection("poll").findOne({ _id: ObjectId(id) });
  if (!date) {
    res.status(404).send("Não existe essa enquete");
  }
  
  const result = await db.collection("poll").aggregate([{$sortByCount: "$title"}]).toArray()

   return res.send(result);
  }catch (err) {
    console.log(err);
    res.status(500).send("Deu algo errado no servidor");
  }
}
