import path from "path";
import fs from "fs";

import { NextApiRequest, NextApiResponse } from "next";

export const runtime = "experimental-edge";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.body;
  const dir = path.resolve("./src", "/pages/post");
  if (!dir) {
    res.statusCode = 500;
    throw Error("Directory not found");
  }

  const posts = fs.readdirSync(dir);
  if (!posts) {
    res.statusCode = 500;
    throw Error("Directory could not be read");
  }

  const fileName = `${id}.page.mdx`;

  res.statusCode = 200;
};
