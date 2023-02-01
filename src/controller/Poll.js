import db from "../config/database.js";

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
  const poll = req.body;

  try {
    const newPoll = await db.collection("poll").insertOne({
        title: poll.title,
        expireAt: poll.expireAt,
      });
    
    console.log(newPoll);
    return res.status(201).send(newPoll);
  } catch (err) {
    console.log(err);
    res.status(500).send("Deu algo errado no servidor");
  }
}
