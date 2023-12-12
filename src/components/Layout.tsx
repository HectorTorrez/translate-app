interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <section className="h-screen my-10 xl:h-[calc(100vh-120px)]  ">
      {children}
    </section>
  );
}
