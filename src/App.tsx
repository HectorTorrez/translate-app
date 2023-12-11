import { useState } from "react";
import { Card } from "./components/Card";
import { ChangeLanguage, Copy, Logo, Sound } from "./components/Icons";

export default function App(): JSX.Element {
  const [text, setText] = useState("Hello, how are you?");

  const hangleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <section className="h-screen my-10">
      <section className="flex justify-center mb-10">
        <Logo />
      </section>
      <Card languageList={["Detect Language", "English", "French", "Spanish"]}>
        <form>
          <textarea
            className="w-full bg-inherit px-7 pt-5  "
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
          <article className="flex justify-between items-center py-5 px-7">
            <div className="flex gap-3">
              <button className="border-2 border-secondary-ligth p-2 rounded-xl">
                <Sound />
              </button>
              <button className="border-2 border-secondary-ligth p-2 rounded-xl">
                <Copy />
              </button>
            </div>
            <div>
              <button className="bg-primary-buttons py-3 px-8 rounded-xl border border-secondary-lightest font-semibold">
                Translate
              </button>
            </div>
          </article>
        </form>
      </Card>
      <Card
        languageList={["English", "French", "Spanish"]}
        changeLanguage={<ChangeLanguage />}
      >
        <form>
          <textarea
            className="w-full bg-inherit px-7 pt-5  "
            name="text"
            id="text"
            cols={5}
            rows={10}
          ></textarea>
          <article className="flex justify-between items-center py-5 px-7">
            <div className="flex gap-3">
              <button className="border-2 border-secondary-ligth p-2 rounded-xl">
                <Sound />
              </button>
              <button className="border-2 border-secondary-ligth p-2 rounded-xl">
                <Copy />
              </button>
            </div>
          </article>
        </form>
      </Card>
    </section>
  );
}
