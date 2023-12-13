interface ToastProps {
  text: string;
  className: string;
}

export function Toast({ text, className }: ToastProps) {
  return (
    <div className={className}>
      <p>{text}</p>
    </div>
  );
}
