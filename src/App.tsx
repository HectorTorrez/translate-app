import { Card } from "./components/Card";
import { ChangeLanguage, Copy, Sound } from "./components/Icons";
import { Button } from "./components/Button";
import { Layout } from "./components/Layout";
import LogoLayout from "./components/LogoLayout";
import Form from "./components/Form";
import { useRef, useState } from "react";
import { translateApi } from "./api/translateApi";
import { cn } from "./utils/cn";
import { languages } from "./utils/languages";
import { Toast } from "./components/Toast";

export default function App(): JSX.Element {
  const [translate, setTranslate] = useState("");
  const [firstLanguage, setFirstLanguage] = useState("en");
  const [secondLanguage, setSecondLanguage] = useState("fr");
  const [translateResult, setTranslateResult] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const translatedRef = useRef<HTMLParagraphElement>(null);

  const copyTextarea = async () => {
    if (textareaRef.current === null) return;
    try {
      await navigator.clipboard.writeText(textareaRef.current.value);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const copyTranslated = async () => {
    console.log("here");
    if (translatedRef.current === null) return;
    try {
      await navigator.clipboard.writeText(translatedRef.current.innerText);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const hangleChange = (text: string) => {
    setTranslate(text);
  };

  const handleTranslate = async () => {
    const response = await translateApi(
      firstLanguage,
      secondLanguage,
      translate
    );
    setTranslateResult(response);
  };

  const handleChangeLanguage = () => {
    setFirstLanguage(secondLanguage);
    setSecondLanguage(firstLanguage);
  };

  return (
    <Layout>
      <LogoLayout />
      <section className="xl:flex xl:justify-center xl:w-full">
        <Card>
          <article className="flex items-center gap-10 border-b border-secondary-ligth py-5 mx-7">
            {languages.map((language) => {
              return (
                <Button
                  key={language.id}
                  className={cn("bg-secondary-ligh text-secondary", {
                    "bg-secondary-lightest p-2 rounded-lg":
                      firstLanguage === language.code,
                  })}
                  type="button"
                  onClick={() => {
                    setFirstLanguage(language.code);
                  }}
                >
                  {language.name}
                </Button>
              );
            })}
          </article>
          <Form onHandleChange={hangleChange} textareaRef={textareaRef} />
          <article className="flex justify-between items-center py-5 px-7">
            <div className="flex gap-3">
              <Button
                className="border-2 border-secondary-ligth p-2 rounded-xl"
                type="button"
                onClick={() => {}}
              >
                <Sound />
              </Button>
              <Button
                className="relative border-2 border-secondary-ligth p-2 rounded-xl"
                type="button"
                onClick={() => {
                  copyTextarea();
                }}
              >
                {isCopied ? (
                  <Toast text="Copied!" className="absolute -top-9 -right-3 " />
                ) : null}
                <Copy />
              </Button>
            </div>
            <div>
              <Button
                className="bg-primary-buttons py-3 px-8 rounded-xl border border-secondary-lightest font-semibold"
                type="button"
                onClick={() => {
                  handleTranslate();
                }}
              >
                Translate
              </Button>
            </div>
          </article>
        </Card>
        <Card>
          <article className="flex items-center justify-between gap-10 border-b border-secondary-ligth py-5 mx-7">
            <section className="flex gap-10">
              {languages.map((language) => {
                return (
                  language.code !== "auto" && (
                    <Button
                      key={language.id}
                      className={cn("bg-secondary-ligh text-secondary", {
                        "bg-secondary-lightest p-2 rounded-lg":
                          secondLanguage === language.code,
                      })}
                      type="button"
                      onClick={() => {
                        setSecondLanguage(language.code);
                      }}
                    >
                      {language.name}
                    </Button>
                  )
                );
              })}
            </section>
            <Button
              className="border-2 border-secondary-ligth p-2 rounded-xl"
              onClick={handleChangeLanguage}
              type="button"
            >
              <ChangeLanguage />
            </Button>
          </article>
          <p
            ref={translatedRef}
            className="w-full h-[218px] bg-inherit px-7 pt-5 "
          >
            {translateResult}
          </p>

          <article className="flex justify-between items-center py-5 px-7">
            <div className="flex  gap-3">
              <Button
                className="border-2 border-secondary-ligth p-2 rounded-xl"
                type="button"
                onClick={() => {}}
              >
                <Sound />
              </Button>
              <Button
                className="relative border-2 border-secondary-ligth p-2 rounded-xl"
                type="button"
                onClick={() => {
                  copyTranslated();
                }}
              >
                {isCopied ? (
                  <Toast text="Copied!" className="absolute -top-9 -right-3 " />
                ) : null}
                <Copy />
              </Button>
            </div>
          </article>
        </Card>
      </section>
    </Layout>
  );
}
