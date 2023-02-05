import fs from "node:fs/promises";
import express from "express";

const PORT = 4040;

const app = express();

app.post("/subscribe", async (req, res) => {
  const q = req.query;
  console.log(q);
  await fs.appendFile("emails.txt", req.query.email + "\n", "utf-8");
  res.end({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});
