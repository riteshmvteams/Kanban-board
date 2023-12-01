export default function InputBox({
  label,
  name,
  placeholder,
  type = "text",
  value,
  handleChange,
  error,
}) {
  return (
    <div className="input__wrapper">
      {label && <label htmlFor={name}>{label}</label>}
      <div>
        <input
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="form__input"
          type={type}
          name={name}
          id={name}
          autoComplete="off"
        />
        {error && <span>{error}</span>}
      </div>
    </div>
  );
}
