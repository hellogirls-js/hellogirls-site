export async function getData(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    let data = await response.json();
    if (data[0]) {
      data = data.filter((d: any) => d.compliant === "TRUE");
    }
    return {
      status: "success",
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
    };
  }
}
