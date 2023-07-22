import fs from "fs";
import path from "path";

import { NextApiRequest, NextApiResponse } from "next";

export const runtime = "experimental-edge";

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  const dirPath = "moo";
  const dir = path.resolve("./public", dirPath);

  const files = fs.readdirSync(dir);

  const images = files.map((name) => path.join("/", dirPath, name));

  res.statusCode = 200;
  res.json(images);
};
