/* eslint-disable prettier/prettier */
import { useQuery } from "@tanstack/react-query";
import { count } from "console";

import { getData } from "utils/data";
import { createClient } from "utils/supabase/client";

const supabase = createClient();

interface Results {
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
      const countData = await supabase.from("lipbite").select("*", { count: "exact", head: true});
      const count = countData.count ?? 0;
      let index = 0;
      const resultsArray: Array<{
        character_id: number;
        choice: boolean;
        created_at: string;
        id: number;
      }> = [];
      while (index < count) {
        const results = await supabase.from("lipbite").select().range(index, index + 999);
        resultsArray.push(...(results.data ?? []));
        index += 1000;
      }
      console.log("results array", resultsArray);
      const mappedResults = charas.map((chara) => {
        const filteredCharaResults = resultsArray.filter(
          (data) => data.character_id === chara.character_id,
        );

        if (filteredCharaResults) {
          const countLikes = filteredCharaResults.reduce((total, current) => {
            if (current.choice) {
              return total + 1;
            } else return total;
          }, 0);

          const countDislikes =
            filteredCharaResults?.filter((data) => !data.choice).length ?? 0;
          const total = filteredCharaResults?.length ?? 1;

          return {
            id: chara.character_id,
            name: chara.first_name,
            likeCount: countLikes,
            dislikeCount: countDislikes,
            total,
            likePercent: (countLikes / total) * 100,
            dislikePercent: (countDislikes / total) * 100,
          } as Results;
        }
      });

      return mappedResults as Results[];
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
