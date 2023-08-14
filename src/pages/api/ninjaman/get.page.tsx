import fs from "fs";
import path from "path";

import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const dirPath = "ninjaman";
  const dir = path.resolve("./public", dirPath);

  const phraseOptions = fs.readdirSync(dir);
  const randomIndex = Math.floor(Math.random() * phraseOptions.length);

  try {
    console.log(phraseOptions);
    const phraseType = phraseOptions[randomIndex].split("s.txt")[0];
    const text = fs.readFileSync(
      path.resolve("./public/ninjaman", phraseOptions[randomIndex]),
      "utf-8"
    );
    let splitText = text.split("\n");
    console.log("splitText: ", splitText);
    let randomIndex2 = Math.floor(Math.random() * splitText.length);
    res.status(200).json({ type: phraseType, phrase: splitText[randomIndex2] });
  } catch (err) {
    res.statusCode = 500;
    console.error(err);
  }
};
