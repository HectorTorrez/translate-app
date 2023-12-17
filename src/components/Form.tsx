import { useEffect, useState } from "react";

interface FormProps {
  onHandleChange: (text: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  translate: string;
  isChangeLanguage: boolean;
}

export default function Form({
  onHandleChange,
  textareaRef,
  translate,
  isChangeLanguage,
}: FormProps) {
  const [text, setText] = useState("Hello, how are you?");

  const hangleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    setText(translate);
  }, [isChangeLanguage]);

  useEffect(() => {
    onHandleChange(text);
  }, [text]);

  return (
    <form>
      <textarea
        className="w-full bg-inherit px-7 pt-5  "
        ref={textareaRef}
        name="text"
        id="text"
        value={text}
        cols={5}
        rows={10}
        onChange={(e) => {
          hangleChange(e);
        }}
        maxLength={500}
      ></textarea>
      <div className="flex justify-end font-medium text-secondary-ligth px-7">
        <p>{text.length}/500</p>
      </div>
    </form>
  );
}
