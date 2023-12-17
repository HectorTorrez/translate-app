import { Layout } from "./components/Layout";
import LogoLayout from "./components/LogoLayout";

import { useState } from "react";

import TranslateCard from "./components/TranslateCard";
import TranslatedCard from "./components/TranslatedCard";
import { translateApi } from "./api/translateApi";
// import { franc } from "franc-min";

export default function App(): JSX.Element {
  const [translate, setTranslate] = useState("Hello, how are you?");
  const [translateResult, setTranslateResult] = useState("");
  const [firstLanguage, setFirstLanguage] = useState("en");
  const [secondLanguage, setSecondLanguage] = useState("fr");
  const [isChangeLanguage, setIsChangeLanguage] = useState(false);

  const handleChangeLanguage = async () => {
    setFirstLanguage(secondLanguage);
    setSecondLanguage(firstLanguage);
    const response = await translateApi(
      firstLanguage,
      secondLanguage,
      translateResult
    );
    if (response === "") return;
    setTranslate(response);
    setTranslateResult(translate);
    setIsChangeLanguage(!isChangeLanguage);
  };

  // const handleDetectLanguage = () => {
  //   const langCode = franc(translate);

  //   console.log(source);
  //   setFirstLanguage(source);
  // };

  return (
    <Layout>
      <LogoLayout />
      <section className="xl:flex xl:justify-center xl:w-full">
        <TranslateCard
          setTranslateResult={setTranslateResult}
          firstLanguage={firstLanguage}
          secondLanguage={secondLanguage}
          setFirstLanguage={setFirstLanguage}
          translate={translate}
          setTranslate={setTranslate}
          isChangeLanguage={isChangeLanguage}
          // handleDetectLanguage={handleDetectLanguage}
        />
        <TranslatedCard
          secondLanguage={secondLanguage}
          handleChangeLanguage={handleChangeLanguage}
          setSecondLanguage={setSecondLanguage}
          translateResult={translateResult}
        />
      </section>
    </Layout>
  );
}
