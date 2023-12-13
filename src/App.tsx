import { Layout } from "./components/Layout";
import LogoLayout from "./components/LogoLayout";

import { useState } from "react";

import TranslateCard from "./components/TranslateCard";
import TranslatedCard from "./components/TranslatedCard";

export default function App(): JSX.Element {
  const [translate, setTranslate] = useState("");
  const [translateResult, setTranslateResult] = useState("");
  const [firstLanguage, setFirstLanguage] = useState("en");
  const [secondLanguage, setSecondLanguage] = useState("fr");

  const handleChangeLanguage = async () => {
    setFirstLanguage(secondLanguage);
    setSecondLanguage(firstLanguage);
  };

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
