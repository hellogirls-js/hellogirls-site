import { Dispatch, SetStateAction } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import Image from "next/image";

import styles from "../../styles/Form.module.scss";

import Alert from "component/utility/Alert";
import Tooltip from "component/utility/Tooltip";

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
  function FaveUnitTile({ unit }: { unit: any }) {
    return (
      <div
        className={
          faveUnit === unit.id
            ? styles.unitCheckboxContainerPicked
            : styles.unitCheckboxContainer
        }
        onClick={(e) => {
          setFaveUnit(unit.id);
        }}
      >
        {faveUnit === unit.id && (
          <div className={styles.checkboxIcon}>
            <IconCheck />
          </div>
        )}
        <input
          className={styles.checkbox}
          type="radio"
          name="faveUnit"
          value={unit.id}
          aria-label={unit.name}
          checked={unit.id === faveUnit}
        />
        <div className={styles.unitImage}>
          <Image
            src={`https://assets.enstars.link/assets/unit_logo_border_${unit.id}.png`}
            alt={unit.name}
            fill={true}
          />
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
        <label className={styles.formLabel} htmlFor="fave_unit">
          <h3>choose your favorite unit</h3>
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
