interface ButtonProps {
  className: string;
  children: React.ReactNode;
  type: "submit" | "reset" | "button";
  onClick: () => void;
  disabled?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

export function Button({
  className,
  children,
  type,
  onClick,
  disabled,
  onKeyDown,
}: ButtonProps) {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onKeyDown={onKeyDown}
    >
      {children}
    </button>
  );
}
