import fs from "fs";
import path from "path";

import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const dirPath = "moo";
  const dir = path.resolve("./public", dirPath);

  const files = fs.readdirSync(dir);

  const portrait = files
    .map((name) => path.join("/", dirPath, name))
    .filter((p) => p === path.join("/", dirPath, "15.jpg"))[0];

  res.statusCode = 200;
  res.json(portrait);
};
