export const textToSpeech = (text: string, languange: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = languange;
  speechSynthesis.speak(utterance);
};
