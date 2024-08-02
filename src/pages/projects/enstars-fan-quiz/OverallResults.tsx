import React from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import styles from "../styles/FanQuiz.module.scss";

import { QuizDBItem, QuizResult, quizResults } from "./data";

interface QuizResultCount {
  name: string | null;
  count: number;
  fullMark?: number;
}

export default function OverallResults({
  overallResults,
  userResult,
}: {
  overallResults: QuizDBItem[];
  userResult?: { result: QuizResult; value: number };
}) {
  const countOverallResults = React.useMemo(() => {
    const initial: QuizResultCount[] = [];
    return overallResults
      .reduce((total: QuizResultCount[], current: QuizDBItem) => {
        const indexOfItem = total.findIndex(
          (item: any) => item.name === current.result_name,
        );
        if (indexOfItem < 0) {
          total.push({
            name: current.result_name,
            count: 1,
          });
        } else {
          total[indexOfItem].count++;
        }
        return total;
      }, initial)
      .sort((a, b) => b.count - a.count);
  }, [overallResults]);

  const maxResult = countOverallResults[0];

  const averageResults = React.useMemo(() => {
    const initial: QuizResultCount[] = quizResults.map((result) => ({
      name: result,
      count: 0,
      fullMark: 28,
    }));

    const total = overallResults.reduce(
      (total: QuizResultCount[], current: QuizDBItem) => {
        quizResults.forEach((result) => {
          const resultKey = result.toLowerCase().replaceAll(" ", "_");
          const indexOfResult = total.findIndex((r) => r.name === result);
          total[indexOfResult].count +=
            current?.result_values?.[
              resultKey as keyof typeof current.result_values
            ] ?? 0;
        });
        return total;
      },
      initial,
    );

    const averaged = total
      .map((result) => ({
        ...result,
        count: Math.round(result.count / overallResults.length),
      }))
      .sort((a, b) => b.count - a.count);

    return averaged;
  }, [overallResults]);

  return (
    <div className={styles.overallResultsContainer}>
      <h3>Here is how other people scored,</h3>
      <div className={styles.overallResultsChart}>
        <div className={styles.overallResultsChartContainer}>
          {countOverallResults.map((result) => (
            <div
              key={result.name}
              className={`${styles.overallResultsChartBar}${
                userResult?.result === result.name ? ` ${styles.selected}` : ""
              }`}
              style={{ width: `${(result.count / maxResult.count) * 100}%` }}
            >
              <strong>{result.name}</strong>{" "}
              {Math.round((result.count / overallResults.length) * 100)}% (
              {result.count} fans)
            </div>
          ))}
        </div>
      </div>
      <h3>
        And here is what the average quiz taker&apos;s overall stats would be,
      </h3>
      <div className={styles.averageResultsChart}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={averageResults}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis domain={[0, 28]} />
            <Tooltip />
            <Radar dataKey="count" stroke="#dcdea9" fill="#dcdea9" />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
