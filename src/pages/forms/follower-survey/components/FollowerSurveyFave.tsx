import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { IconAlertTriangle, IconCircleCheck } from "@tabler/icons-react";

import styles from "../../styles/Form.module.scss";

import Alert from "component/utility/Alert";
import Tooltip from "component/utility/Tooltip";
import { twoStarIDs } from "data/twoStarIds";

export default function FollowerSurveyFave({
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
  const sortedData = enData.sort((charaA: any, charaB: any) => {
    let jpDataA = rawData.find(
      (j: any) => j.character_id === charaA.character_id
    );
    let jpDataB = rawData.find(
      (j: any) => j.character_id === charaB.character_id
    );

    return jpDataA.sort_id - jpDataB.sort_id;
  });

  function FaveUnitTile({ unit }: { unit: any }) {
    const picked = faveUnit === unit.id;

    return (
      <div
        className={[
          styles.unitCheckboxContainer,
          picked ? styles.picked : "",
        ].join(" ")}
        onClick={(e) => {
          setFaveUnit(unit.id);
        }}
      >
        <input
          className={styles.checkbox}
          type="radio"
          name="fave_unit"
          value={unit.id}
          aria-label={unit.name}
          checked={picked}
          readOnly
        />
        <div className={styles.unitName}>{unit.name}</div>
      </div>
    );
  }

  function FaveCharaTile({ chara }: { chara: any }) {
    const [picked, setPicked] = useState<boolean>(
      faveChara === chara.character_id
    );

    const imgUrl = `https://assets.enstars.link/assets/card_full1_${
      (twoStarIDs as any)[chara.character_id]
    }_normal.png`;

    const imgUrlSubtracted = `https://assets.enstars.link/assets/card_full1_${
      (twoStarIDs as any)[chara.character_id]
    }_subtracted.png`;

    useEffect(() => {
      setPicked(faveChara === chara.character_id);
    }, [faveChara]);

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
          name="fave_chara"
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
          <h3>choose your favorite unit</h3>
          <Tooltip
            label="this is required"
            position="top"
            style={{ width: "auto" }}
          >
            <span className={styles.asterisk}>*</span>
          </Tooltip>
        </label>
        {error?.noFaveUnit && (
          <Alert
            icon={<IconAlertTriangle />}
            type="warning"
            style={{ width: isDesktop ? "40%" : "100%", margin: "10px 0" }}
          >
            Please select your favorute unit!
          </Alert>
        )}
        <div className={styles.checkboxContainer}>
          {unitData.map((unit: any) => (
            <FaveUnitTile unit={unit} key={unit.id} />
          ))}
        </div>
      </div>
      <div className={styles.formSection}>
        <label className={styles.formLabel} htmlFor="faveChara">
          <h3>now, choose your favorite character</h3>
          <Tooltip
            label="this is required"
            position="top"
            style={{ width: "auto" }}
          >
            <span className={styles.asterisk}>*</span>
          </Tooltip>
        </label>
        {error?.noFaveChara && (
          <Alert
            icon={<IconAlertTriangle />}
            type="warning"
            style={{ width: isDesktop ? "40%" : "100%", margin: "10px 0" }}
          >
            Please select your favorute character!
          </Alert>
        )}
        <div className={styles.checkboxContainer}>
          {sortedData.map((chara: any) => (
            <FaveCharaTile chara={chara} key={chara.character_id} />
          ))}
        </div>
      </div>
      {error?.isBot && (
        <Alert
          icon={<IconAlertTriangle />}
          type="warning"
          style={{ width: isDesktop ? "40%" : "100%", margin: "10px 0" }}
        >
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
