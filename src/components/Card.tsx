import { type ReactNode } from "react";

interface CardProps {
  languageList: string[];
  children: React.ReactNode;
  changeLanguage?: ReactNode;
}

export function Card({ languageList, children, changeLanguage }: CardProps) {
  return (
    <section className="m-3 bg-primary-ligth rounded-3xl border-secondary-ligth text-secondary-lightest">
      <section>
        <article className="flex items-center justify-between border-b border-secondary-ligth py-5 mx-7">
          <ul className="flex items-center gap-5  font-semibold">
            {languageList.map((language) => {
              return <li key={language}>{language}</li>;
            })}
          </ul>
          {changeLanguage !== undefined ? (
            <div className="border-2 border-secondary-ligth p-1 rounded-xl ">
              {changeLanguage}
            </div>
          ) : null}
        </article>
        {children}
      </section>
    </section>
  );
}
