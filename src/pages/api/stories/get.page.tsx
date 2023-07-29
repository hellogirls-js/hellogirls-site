import fs from "fs";
import path from "path";

import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const dirPath = "stories";
  const dir = path.resolve("./public", dirPath);

  const stories = fs.readdirSync(dir);
  const randomIndex = Math.floor(Math.random() * stories.length);

  try {
    const text = fs.readFileSync(
      path.resolve("./public/stories", stories[randomIndex]),
      "utf-8"
    );
    res.status(200).json({ text: text });
  } catch (err) {
    res.statusCode = 500;
    console.error(err);
  }
};
