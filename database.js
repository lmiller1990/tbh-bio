import fs from "node:fs/promises";
import express from "express";

const PORT = 4040;

const app = express();

app.post("/subscribe", async (req, res) => {
  await fs.appendFile("emails.txt", req.query.email + "\n", "utf-8");
  res.json({ status: "OK" });
});

app.get("/secret-list-of-emails", async (req, res) => {
  let data;
  try {
    data = await fs.readFile("emails.txt", "utf-8");
  } catch (e) {
    res.send(``);
    res.end();
    return;
  }

  let emails = new Set([
    ...data
      .split("\n")
      .map((x) => x.trim())
      .filter((x) => x.includes("@"))
  ]);
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <body>
    ${Array.from(emails).map((x) => `<div>${x}</div>`).join("")}
    </body>
    </html>
  `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});
