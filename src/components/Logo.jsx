import logoDark from "../assets/logodark.svg";

export default function Logo() {
  return (
    <button className="kanban__logo">
      <img src={logoDark} alt="logoDark" width={155} height={30} />
    </button>
  );
}
