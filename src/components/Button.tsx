interface ButtonProps {
  className: string;
  children: React.ReactNode;
  type: "submit" | "reset" | "button";
  onClick: () => void;
}

export function Button({ className, children, type, onClick }: ButtonProps) {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
