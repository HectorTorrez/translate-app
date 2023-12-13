import { useRef, useState } from "react";
import { Button } from "./Button";
import { Copy, Sound } from "./Icons";
import Form from "./Form";
import { languages } from "../utils/languages";
import { Card } from "./Card";
import { translateApi } from "../api/translateApi";
import { cn } from "../utils/cn";
import { Toast } from "./Toast";
import { textToSpeech } from "../utils/textToSpeech";

interface TranslateCardProps {
  setTranslateResult: (text: string) => void;
  setFirstLanguage: (text: string) => void;
  setTranslate: (text: string) => void;
  firstLanguage: string;
  secondLanguage: string;
  translate: string;
}

export default function TranslateCard({
  setTranslateResult,
  firstLanguage,
  secondLanguage,
  setFirstLanguage,
  translate,
  setTranslate,
}: TranslateCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const listenText = () => {
    textToSpeech(translate, firstLanguage);
  };
  return (
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
  );
}
