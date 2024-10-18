/* eslint-disable prettier/prettier */
import { useQuery } from "@tanstack/react-query";
import { getData } from "utils/data";
import { createClient } from "utils/supabase/client";

const supabase = createClient();

interface Result {
  id: number;
  name: string;
  likeCount: number;
  dislikeCount: number;
  total: number;
  likePercent: number;
  dislikePercent: number;
}

export default function MyCuriosity(props: any) {
  const charas: EnCharacterData[] = props.charaData;
  const { data: charaResults } = useQuery({
    queryKey: ["getAllResults"],
    queryFn: async () => {
      const mappedResults: Result[] = [];

      charas.filter(chara => chara.character_id !== 31 && chara.character_id !== 32 && chara.character_id !== 68 && chara.character_id !== 73).forEach(async (chara) => {
        const charaLikeData = await supabase
        .from("lipbite")
        .select("*", { count: "exact", head: true })
        .eq("character_id", chara.character_id)
        .eq("choice", true);

        const charaLikeCount = charaLikeData.count ?? 0;

        const charaPassData = await supabase
          .from("lipbite")
          .select("*", { count: "exact", head: true })
          .eq("character_id", chara.character_id)
          .eq("choice", false);

        const charaPassCount = charaPassData.count ?? 0;

        const charaTotal = charaLikeCount + charaPassCount > 0 ? charaLikeCount + charaPassCount : 1;

          const resultObj: Result = {
            id: chara.character_id,
            name: chara.first_name,
            likeCount: charaLikeCount,
            dislikeCount: charaPassCount,
            total: charaTotal ?? 1,
            likePercent: (charaLikeCount / charaTotal) * 100,
            dislikePercent: (charaPassCount / charaTotal) * 100,
          }

          mappedResults.push(resultObj);
      })

      return mappedResults as Result[];
    },
  });

  return (
    <div>
      <h3>liked</h3>
      <ol>
        {charaResults &&
          charaResults
            .sort((a, b) => b.likePercent - a.likePercent)
            .map((result) => (
              <li key={result.id}>
                {result.name}: {result.likePercent.toFixed(1)}%
              </li>
            ))}
      </ol>
      <h3>disliked</h3>
      <ol>
        {charaResults &&
          charaResults
            .sort((a, b) => b.dislikePercent - a.dislikePercent)
            .map((result) => (
              <li key={result.id}>
                {result.name}: {result.dislikePercent.toFixed(1)}%
              </li>
            ))}
      </ol>
    </div>
  );
}

export async function getServerSideProps() {
  const DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";

  const enData = await getData(DATA_URL);

  return {
    props: {
      title: "Bumble | ASOBI! After Dark",
      charaData: enData.data,
    },
  };
}
