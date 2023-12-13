import { useRef, useState } from "react";
import { languages } from "../utils/languages";
import { Button } from "./Button";
import { Card } from "./Card";
import { ChangeLanguage, Copy, Sound } from "./Icons";
import { cn } from "../utils/cn";
import { Toast } from "./Toast";
import { textToSpeech } from "../utils/textToSpeech";

interface TranslatedCardProps {
  secondLanguage: string;
  setSecondLanguage: (text: string) => void;
  translateResult: string;
  handleChangeLanguage: () => void;
}

export default function TranslatedCard({
  secondLanguage,
  setSecondLanguage,
  translateResult,
  handleChangeLanguage,
}: TranslatedCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const translatedRef = useRef<HTMLParagraphElement>(null);
  const copyTranslated = async () => {
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

  const listenText = () => {
    textToSpeech(translateResult, secondLanguage);
  };
  return (
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
          className={cn(
            "border-2 border-secondary-ligth p-2 rounded-xl cursor-pointer",
            {
              "opacity-60 cursor-not-allowed": translateResult === "",
            }
          )}
          onClick={handleChangeLanguage}
          type="button"
          disabled={translateResult === ""}
        >
          <ChangeLanguage />
        </Button>
      </article>
      <p ref={translatedRef} className="w-full h-[218px] bg-inherit px-7 pt-5 ">
        {translateResult}
      </p>

      <article className="flex justify-between items-center py-5 px-7">
        <div className="flex  gap-3">
          <Button
            className="border-2 border-secondary-ligth p-2 rounded-xl"
            type="button"
            onClick={() => {
              listenText();
            }}
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
  );
}
