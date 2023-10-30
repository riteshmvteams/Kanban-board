import Button from "./Button";
import Logo from "./Logo";
import dotIcon from "../assets/dots.svg";

export default function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <Logo />
      </div>

      <div className="header__content">
        <h2 className="header__content--title">Development Board</h2>

        <div className="header__content--action">
          <Button className="primary" type="button">
            + Add New Task
          </Button>

          <button className="header__content--more">
            <img src={dotIcon} alt="doticon" />
          </button>
        </div>
      </div>
    </div>
  );
}
