import { useSelector } from "react-redux";
import logoDark from "../assets/logodark.svg";
import logoLight from "../assets/logoLight.svg";
import { currentTheme } from "../redux/themeSlice";

export default function Logo({ setSidebarOpen }) {
  const theme = useSelector(currentTheme);
  return (
    <button
      className="kanban__logo"
      onClick={() => setSidebarOpen((prev) => !prev)}
    >
      <img
        src={theme === "dark" ? logoDark : logoLight}
        alt="logoDark"
        width={155}
        height={30}
      />
    </button>
  );
}
