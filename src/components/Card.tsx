interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <section className="m-3 bg-primary-ligth rounded-3xl border-secondary-ligth text-secondary-lightest  xl:w-full">
      <section>{children}</section>
    </section>
  );
}
