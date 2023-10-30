import { useEffect, useRef } from "react";

export default function ActionButtons({
  top,
  left,
  setShowAction,
  showAction,
}) {
  const popupRef = useRef(null);
  const hideAction = () => {
    setShowAction(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowAction(false);
      }
    }

    if (showAction) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAction]);

  return (
    <ul
      ref={popupRef}
      className={`action__buttons ${showAction ? "showAction" : ""}`}
      style={{
        top,
        left,
      }}
    >
      <li>
        <button onClick={hideAction}>Edit Board</button>
      </li>
      <li>
        <button onClick={hideAction} className="delete">
          Delete Board
        </button>
      </li>
    </ul>
  );
}
