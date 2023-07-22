import { useContext } from "react";
import Image from "next/image";

import styles from "../styles/Follower.module.scss";

import MainLayout from "component/MainLayout";
import getData from "component/utility/data";
import followerData from "data/follower_data.json";
import { DarkModeContext } from "context/DarkModeContext";
import Strong from "component/utility/Strong";
import { twoStarIDs } from "data/twoStarIds";
import { ASPECT_RATIO } from "component/utility/constants";

export const runtime = "experimental-edge";

interface FollowerData {
  units: string;
  characters: string;
}

interface ProcessedData {
  units: number[];
  characters: number[];
}

interface DataCount {
  id: number;
  count: number;
}

/**
 * converts data into an array of numbers
 * @returns {ProcessedData[]} data that has been processed and made into numbers
 */
function processData(): ProcessedData[] {
  let processedData: ProcessedData[] = followerData.map<ProcessedData>(
    (d: FollowerData) => {
      let separatedUnits = d.units.split(", ");
      let separatedCharas = d.characters.split(", ");
      let parsedUnits: string[] = separatedUnits
        .map((u) => u.split(". "))
        .flat()
        .filter((u) => !isNaN(parseInt(u)));
      let parsedCharas: string[] = separatedCharas
        .map((c) => c.split(". "))
        .flat()
        .filter((c) => !isNaN(parseInt(c)));
      let numberedUnits = parsedUnits.map((u) => parseInt(u));
      let numberedCharas = parsedCharas.map((c) => parseInt(c));
      return { units: numberedUnits, characters: numberedCharas };
    }
  );

  return processedData;
}

/**
 * @param {"units" | "characters"} key which data i should extract
 * @param {"id" | "count"} sort how to sort the data
 * @returns {DataCount[]} the counted data
 */
function getDataCount(
  key: "units" | "characters",
  sort?: "id" | "count"
): DataCount[] {
  let countedData: DataCount[] = [];
  let processedData = processData();
  let isolatedData = processedData.map((d) => d[key]).flat();
  isolatedData.forEach((d) => {
    if (countedData.find((c) => c.id === d)) {
      // if this id already exists in the counted data array
      let i = countedData.findIndex((c) => c.id === d);
      countedData[i].count++;
    } else {
      let newObj: DataCount = { id: d, count: 1 };
      countedData.push(newObj);
    }
  });

  if (sort)
    countedData = countedData.sort((a, b) => {
      return sort === "id" ? a.id - b.id : a.count - b.count;
    });
  return countedData;
}

function DisplayRank({
  data,
  dataType,
  displayType,
  list,
  charData,
  unitData,
}: {
  data: DataCount;
  dataType: "units" | "characters";
  displayType: "grid" | "list";
  list: DataCount[];
  charData?: any[];
  unitData?: any[];
}) {
  const index = list.findIndex((d) => d.id === data.id);
  const imgUrl =
    dataType === "characters"
      ? `https://assets.enstars.link/assets/card_full1_${
          (twoStarIDs as any)[data.id]
        }_normal.png`
      : `https://assets.enstars.link/assets/unit_logo_border_${data.id}.png`;

  const unitName: string =
    unitData && unitData.find((u: any) => u.id === data.id).name.toLowerCase();
  const firstName: string =
    charData &&
    charData
      .find((c: any) => c.character_id === data.id)
      .first_name.toLowerCase();
  const lastName: string =
    charData && charData.find((c: any) => c.character_id === data.id).last_name;
  const fullName = `${firstName}${
    lastName ? ` ${lastName.toLowerCase()}` : ""
  }`;

  return displayType === "grid" ? (
    <div className={styles.gridItem}>
      <div className={styles.ranking}>#{list.length - index}</div>
      <Image
        src={imgUrl}
        alt={unitName ? unitName : fullName}
        width={dataType === "units" ? 150 : 300}
        height={dataType === "units" ? 150 / ASPECT_RATIO : 300 / ASPECT_RATIO}
      />
      <h4>{unitName ? unitName : fullName}</h4>
      <div className={styles.count}>
        {data.count} {data.count === 1 ? "vote" : "votes"}
      </div>
    </div>
  ) : (
    <div className={styles.listItem}>
      <div className={styles.ranking}>#{list.length - index}</div>
      <Image
        src={imgUrl}
        alt={unitName ? unitName : fullName}
        width={300}
        height={300 / ASPECT_RATIO}
      />
      <div className={styles.listContent}>
        <h4>{unitName ? unitName : fullName}</h4>
        <div className={styles.count}>
          {data.count} {data.count === 1 ? "vote" : "votes"}
        </div>
      </div>
    </div>
  );
}

export default function FollowerSurvey({
  rawData,
  enData,
  unitData,
  title,
}: {
  rawData: any;
  enData: any;
  unitData: any;
  title: string;
}) {
  const { colorTheme } = useContext(DarkModeContext);

  const unitRanking = getDataCount("units", "count");
  const charaRanking = getDataCount("characters", "count");

  const topUnitRanking = unitRanking.slice(
    unitRanking.length - 5,
    unitRanking.length
  );
  const bottomUnitRanking = unitRanking.slice(0, unitRanking.length - 5);

  const topCharaRanking = charaRanking.slice(
    charaRanking.length - 5,
    charaRanking.length
  );
  const bottomCharaRanking = charaRanking.slice(0, charaRanking.length - 5);

  return (
    <MainLayout heading={title}>
      <div className={`${styles.page} ${styles[colorTheme]}`}>
        <h2>i surveyed my followers: the movie</h2>
        <p>
          i went private for a bit and decided to use the opportunity to survey
          my followers and ask them who their favorite characters and units are.
          i also asked for funny and cute statements on why they like their
          favorites because i admittedly needed a pick-me-up. i have almost 900
          followers (which is wild) and over 150 of you responded. this is much
          more than i expected especially considering the fact that i
          didn&apos;t have to beg, so thank you guys!! so, which characters and
          units are the most popular among my followers?
        </p>
        <p>
          note: this does not reflect the entire ensemble stars community.
          granted i do not care about the entire community&apos;s opinions,
          i&apos;m just doing this for my own curiosity.
        </p>
        <h2>hypothesis</h2>
        <p>
          i&apos;m starting off by listing who i think might be the most popular
          among you guys. this is based off of the units and characters i post
          about as well as what i&apos;ve observed among my mutuals.
        </p>
        <h3>favorite units</h3>
        <ul>
          <li>
            <Strong>crazy:b</Strong> -- crazy:b is my favorite unit and
            it&apos;s the main unit i produce. therefore, i would not be
            surprised if 75% of you guys loved crazy:b, too.
          </li>
          <li>
            <Strong>alkaloid</Strong> -- it seems like alkaloid and crazy:b
            kinda comes in a pair so if my crazy:b hypothesis is right, then it
            would make sense if a lot of you guys were alkakureiPs
          </li>
          <li>
            <Strong>valkyrie</Strong> -- valkyrie is popular.
          </li>
          <li>
            <Strong>knights</Strong> -- knights is also popular.
          </li>
        </ul>
        <h3>favorite characters</h3>
        <p>
          this is definitely harder to predict and reason, so i&apos;m going off
          of my own observations.
        </p>
        <ul>
          <li>
            <Strong>ibara saegusa</Strong> -- a lot of my mutuals love her?? go
            off!
          </li>
          <li>
            <Strong>tatsumi kazehaya</Strong> -- i cannot exist without seeing a
            tatsumi icon in my mentions
          </li>
          <li>
            <Strong>arashi narukami</Strong> -- everyone loves arashi literally
            who doesn&apos;t love arashi.
          </li>
          <li>
            <Strong>rinne amagi</Strong> -- if i haven&apos;t accumulated any
            rinne oomfs then i&apos;ve failed and will go deactivate.
          </li>
          <li>
            <Strong>wataru hibiki</Strong> -- wataru invented being nonbinary
            which is why i assume so many of my oomfs like them. but like who
            doesn&apos;t like wataru.
          </li>
        </ul>
        <p>
          and with that, let&apos;s show the results! i&apos;ll be listing the
          results from least to most popular to keep everyone in suspense
        </p>
        <h2>most popular units</h2>
        <div className={styles.rankingGrid}>
          {bottomUnitRanking.map((u) => (
            <DisplayRank
              key={u.id}
              dataType="units"
              data={u}
              displayType="grid"
              list={unitRanking}
              unitData={unitData.data}
            />
          ))}
        </div>
        <div className={styles.rankingList}>
          {topUnitRanking.map((u) => (
            <DisplayRank
              key={u.id}
              dataType="units"
              data={u}
              displayType="list"
              list={unitRanking}
              unitData={unitData.data}
            />
          ))}
        </div>
        <h2>most popular characters</h2>
        <div className={styles.rankingGrid}>
          {bottomCharaRanking.map((u) => (
            <DisplayRank
              key={u.id}
              dataType="characters"
              data={u}
              displayType="grid"
              list={charaRanking}
              charData={enData.data}
            />
          ))}
        </div>
        <div className={styles.rankingList}>
          {topCharaRanking.map((u) => (
            <DisplayRank
              key={u.id}
              dataType="characters"
              data={u}
              displayType="list"
              list={charaRanking}
              charData={enData.data}
            />
          ))}
        </div>
        <h2>conclusion</h2>
        <p>
          i find it funny how my hypothesis for the most popular units was
          basically correct. i knew a lot of my mutuals love eden so i
          don&apos;t know why i didn&apos;t think they&apos;d be that popular.
          however, i was expecting ra*bits to be more popular as a fellow
          ra*bits enjoyer.
        </p>
        <p>
          as for most popular character, um. wow. i did not know so many of yall
          like mika so much! lol. i&apos;m also surprised by how high niki
          placed solely because i&apos;m kind of convinced i&apos;m his #1 fan.
          but idk what else i expected when 70% of my tweets are about how cute
          he is.
        </p>
        <p>
          thank you for doing this little experiment with me!!! i appreciate the
          funny and cute messages yall sent as well they were fun to read. :3
          hope to see yall for the next, bigger survey! *waves*
        </p>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const TL_DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const DATA_URL = "https://data.ensemble.moe/ja/characters.json";
  const UNIT_DATA = "https://tl.data.ensemble.moe/en/units.json";

  const enData = await getData(TL_DATA_URL);
  const rawData = await getData(DATA_URL);
  const unitData = await getData(UNIT_DATA);

  return {
    props: {
      rawData,
      enData,
      unitData,
      title: "mini follower survey!",
      description:
        "i ran a very small survey among my followers to see which characters and units were the most popular to produce.",
    },
  };
}
