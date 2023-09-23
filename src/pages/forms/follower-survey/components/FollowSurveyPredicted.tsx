import { Dispatch, SetStateAction } from "react";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { IconCircleCheck } from "@tabler/icons-react";

import styles from "../../styles/Form.module.scss";

import Alert from "component/utility/Alert";
import Tooltip from "component/utility/Tooltip";
import { twoStarIDs } from "data/twoStarIds";

export default function FollowerSurveyPredicted({
  isVisible,
  unitData,
  rawData,
  enData,
  faveUnit,
  setFaveUnit,
  faveChara,
  setFaveChara,
  setIsBot,
  error,
}: {
  isVisible: boolean;
  unitData: any;
  rawData: any;
  enData: any;
  faveUnit: number | null;
  setFaveUnit: Dispatch<SetStateAction<number | null>>;
  faveChara: number | null;
  setFaveChara: Dispatch<SetStateAction<number | null>>;
  setIsBot: Dispatch<SetStateAction<boolean>>;
  error?: FormError | null;
}) {
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  function FaveUnitTile({ unit }: { unit: any }) {
    const picked = faveUnit === unit.id;

    return (
      <div
        className={[
          styles.unitCheckboxContainer,
          picked ? styles.picked : "",
        ].join(" ")}
      >
        <input
          className={styles.checkbox}
          type="radio"
          name="faveUnit"
          value={unit.id}
          aria-label={unit.name}
          onClick={(e) => {
            setFaveUnit(parseInt((e.target as HTMLInputElement).value));
          }}
        />
        <div className={styles.unitName}>{unit.name}</div>
      </div>
    );
  }

  function FaveCharaTile({ chara }: { chara: any }) {
    const picked = faveChara === chara.character_id;

    const imgUrl = `https://assets.enstars.link/assets/card_full1_${
      (twoStarIDs as any)[chara.character_id]
    }_normal.png`;

    const imgUrlSubtracted = `https://assets.enstars.link/assets/card_full1_${
      (twoStarIDs as any)[chara.character_id]
    }_subtracted.png`;

    return (
      <div
        className={[
          styles.charaCheckboxContainer,
          picked ? styles.picked : "",
        ].join(" ")}
        onClick={(e) => {
          setFaveChara(chara.character_id);
        }}
      >
        <input
          className={styles.checkbox}
          type="radio"
          name="faveChara"
          value={chara.character_id}
          aria-label={chara.first_name}
          checked={picked}
          readOnly
        />
        <div className={styles.charaCheckboxContent}>
          {picked && (
            <IconCircleCheck
              style={{ zIndex: 3, position: "absolute", top: 5, left: 5 }}
              size={30}
            />
          )}
          <span className={styles.charaCheckboxName}>{chara.first_name}</span>
          <div className={styles.coverup}></div>
          <div className={styles.charaCheckboxImage}>
            <Image
              width={640}
              height={361}
              src={imgUrlSubtracted}
              alt={chara.first_name}
              style={{
                position: "absolute",
                opacity: picked ? 1 : 0,
              }}
            />
            <Image
              width={640}
              height={361}
              src={imgUrl}
              alt={chara.first_name}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.formPart}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div className={styles.formSection}>
        <label className={styles.formLabel} htmlFor="faveUnit">
          <h3>
            let&apos;s spice things up a bit, choose the unit you think is the
            most popular
          </h3>
          <Tooltip
            label="this is required"
            position="top"
            style={{ width: "auto" }}
          >
            <span className={styles.asterisk}>*</span>
          </Tooltip>
        </label>
        <div className={styles.checkboxContainer}>
          {unitData.map((unit: any) => (
            <FaveUnitTile unit={unit} key={unit.id} />
          ))}
        </div>
      </div>
      <div className={styles.formSection}>
        <label className={styles.formLabel} htmlFor="faveChara">
          <h3>now, choose the character you think is the most popular</h3>
          <Tooltip
            label="this is required"
            position="top"
            style={{ width: "auto" }}
          >
            <span className={styles.asterisk}>*</span>
          </Tooltip>
        </label>
        <div className={styles.checkboxContainer}>
          {enData.map((chara: any) => (
            <FaveCharaTile chara={chara} key={chara.character_id} />
          ))}
        </div>
      </div>
      {error?.isBot && (
        <Alert style={{ width: isDesktop ? "40%" : "100%" }}>
          Nice try, bot.
        </Alert>
      )}
      <input
        type="checkbox"
        style={{ display: "none" }}
        id="intro-security-check"
        onChange={(e) => setIsBot((e.target as HTMLInputElement).checked)}
      />
    </div>
  );
}
