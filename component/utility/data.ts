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

export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
