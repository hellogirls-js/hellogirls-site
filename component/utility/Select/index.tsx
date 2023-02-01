import styles from "./Select.module.scss";

export default function Select({
  label,
  data,
}: {
  label?: string;
  data: SelectOption[];
}) {
  return (
    <div className={styles.selectMain}>
      {label && <label>{label}</label>}
      <select className={styles.select}>
        {data.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
