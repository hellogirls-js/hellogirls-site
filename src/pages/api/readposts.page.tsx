import fs from "fs";
import path from "path";
import { promisify } from "util";

import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const dirPath = "pages/post";
  const dir = path.resolve("./src", dirPath);
  if (!dir) {
    res.statusCode = 500;
    throw Error("Directory not found");
  }

  const posts = fs.readdirSync(dir);
  if (!posts) {
    res.statusCode = 500;
    throw Error("Directory could not be read");
  }

  const metaRegex = /export const meta = {([^}]*)}/;
  const jsonRegex = /{([^}]*)}/;

  let postsInfo: any[] = [];

  try {
    posts.forEach((post) => {
      if (!post) {
        res.statusCode = 500;
        throw Error("The post was not found");
      }
      const content = fs.readFileSync(
        path.resolve("./src/pages/post", post),
        "utf8"
      );

      const stat = promisify(fs.stat);

      let birthtimeMs, mtimeMs;

      stat(path.resolve("./src/pages/post", post))
        .then((stats) => {
          console.log("stats:", stats);
          birthtimeMs = stats.birthtimeMs;
          mtimeMs = stats.mtimeMs;

          if (!content) {
            res.statusCode = 500;
            throw Error("Content could not be read");
          }
          const meta = content.match(metaRegex);
          const metaJsonArray = meta && meta[0].match(jsonRegex);

          const metaJson =
            metaJsonArray &&
            metaJsonArray[0]
              .replaceAll("\n", "")
              .replace("{  ", "{")
              .replace("title:", '"title":')
              .replace("id:", '"id":')
              .replace("author:", '"author":')
              .replace("url:", '"url":')
              .replace("description:", '"description":')
              .replaceAll(",  ", ",");

          if (!metaJson) {
            res.statusCode = 500;
            throw Error("No meta found");
          }

          const postJson = JSON.parse(metaJson);

          if (birthtimeMs && mtimeMs) {
            postJson.dateCreated = birthtimeMs;
            postJson.dateUpdated = mtimeMs;
          }

          postsInfo.push(postJson);

          res.statusCode = 200;
          res.json(postsInfo);
        })
        .catch((err) => {
          console.error(err);
          res.statusCode = 500;
          throw Error("File stats could not be read");
        });
    });
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
  }
};
