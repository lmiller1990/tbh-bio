// @ts-check

import * as marked from "marked";
import fs from "fs/promises";
import path from "path";

const issues = [
  {
    id: "issue-1",
    name: "Welcome to TBC Bio!",
    date: "1st Feb, 2023",
  },
];

async function main() {
  const template = await fs.readFile("template.html", "utf-8");

  for (const issue of issues) {
    // markdown to html
    const md = await fs.readFile(
      path.join("issues", issue.id, "ISSUE.md"),
      "utf8"
    );
    const html = marked.marked(md);

    // write
    await fs.writeFile(
      `${issue.id}.html`,
      template.replace("__CONTENT__", html)
    );
  }
}

main();
