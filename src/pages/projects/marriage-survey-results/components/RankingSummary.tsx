import Image from "next/image";

import styles from "../../styles/Survey.module.scss";

import totalResults from "data/survey-results/total-results.min.json";
import { twoStarIDs } from "data/twoStarIds";

export default function RankingSummary({
  rawData,
  enData,
}: {
  rawData: any;
  enData: any;
}) {
  let filtered = totalResults.filter((r) => r.id !== 61 && r.id !== 0);
  let mostDesirable: TotalResult[] = filtered;
  let leastDesirable: TotalResult[] = filtered;

  mostDesirable = mostDesirable.sort((a, b) => b.md - a.md).slice(0, 5);
  leastDesirable = leastDesirable.sort((a, b) => a.ld - b.ld).slice(0, 5);

  function RankingList({
    data,
    title,
    id,
  }: {
    data: TotalResult[];
    title: string;
    id: string;
  }) {
    const MAX = 110;
    const IMG_WIDTH = 350;
    return (
      <div className={`${styles.ranking} ${styles[id]}`}>
        <h3>{title}</h3>

        {data.map((r) => {
          let valId: "md" | "ld" = id === "mostDesirable" ? "md" : "ld";
          let charaDataRaw = rawData.find((d: any) => r.id === d.character_id);
          let color = charaDataRaw ? charaDataRaw.image_color : undefined;
          const firstName = enData.find(
            (c: any) => c.character_id === r.id
          ).first_name;
          const lastName =
            enData.find((c: any) => c.character_id === r.id).last_name || "";
          const imgUrl = `https://assets.enstars.link/assets/card_full1_${
            (twoStarIDs as any)[r.id]
          }_normal.png`;

          return (
            <div key={r.id} className={styles.rank}>
              <div
                className={styles.rankBar}
                style={{
                  width: `${(Math.abs(r[valId]) / MAX) * 70}%`,
                  backgroundColor: color,
                }}
              >
                {Math.abs(r[valId])}
              </div>
              <div className={styles.rankImg}>
                <Image
                  src={imgUrl}
                  alt={firstName}
                  width={IMG_WIDTH}
                  height={IMG_WIDTH / 1.775}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles.rankingSummary}>
      <h2 id="summary">ranking summary</h2>
      <p>
        for those who need a recap, here are the top five rankers for each
        category.
      </p>
      <div className={styles.rankingContainer}>
        <RankingList
          title="most desirable"
          data={mostDesirable}
          id="mostDesirable"
        />
        <RankingList
          title="least desirable"
          data={leastDesirable}
          id="leastDesirable"
        />
      </div>
    </div>
  );
}
