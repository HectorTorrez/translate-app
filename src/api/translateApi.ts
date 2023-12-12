export async function translateApi(
  firstLanguange: string,
  secondLanguage: string,
  text: string
): Promise<string> {
  return await fetch(
    `https://api.mymemory.translated.net/get?q=${text}&langpair=${firstLanguange}|${secondLanguage}`
  )
    .then(async (response) => await response.json())
    .then((data) => {
      return data.responseData.translatedText;
    })
    .catch((error) => {
      console.log(error);
    });
}
