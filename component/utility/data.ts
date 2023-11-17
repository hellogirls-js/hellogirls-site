import followerSurveyData from "../../data/follower_survey_data.min.json";

/**
 *
 * @param url MakoTools url to grab data from, either en or jp character or unit data
 * @returns a promise that returns the specified data array
 */
export default function getData(url: string): Promise<any> {
  return fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      let data = resJson;
      if (data[0]) {
        data = data.filter((d: any) => d.compliant === "TRUE");
      }
      return {
        status: "success",
        data: data,
      };
    })
    .catch((err) => {
      console.error(err);
      return { status: "error" };
    });
}

/**
 *
 * @param array the array to shuffle
 * @returns a shuffled array
 */
export function shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 *
 * @returns an array of responses from the follower survey
 */
export function getSurveyResponses(): FollowerSurveyData[] {
  return followerSurveyData;
}

/**
 *
 * @param type the type of response to count votes for
 * @returns an array with counted votes for each character
 */
export function countVotes(type: FollowerSurveyDataType): CountedVotes[] {
  let responses = getSurveyResponses();

  let countedVotes: CountedVotes[] = [];

  for (let i = 0; i < responses.length; i++) {
    const resCharaId = parseInt(responses[i][type].split(": ")[0]);

    let existingIndex = countedVotes.findIndex(
      (chara) => chara.chara_id === resCharaId,
    );

    if (existingIndex > -1) {
      // if the index exists in the countedVotes array, add to the vote count
      countedVotes[existingIndex].count++;
    } else {
      // otherwise, create a new object and add it to countedVotes
      let newCharaCount: CountedVotes = {
        chara_id: resCharaId,
        count: 1,
      };

      countedVotes.push(newCharaCount);
    }
  }

  return countedVotes;
}
