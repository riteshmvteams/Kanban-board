export default function Button({
  children,
  type,
  onClick,
  disabled,
  className,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} custom__button`}
    >
      {children}
    </button>
  );
}
