import { useEffect, useRef } from "react";

export default function ActionButtons({
  top,
  left,
  setShowAction,
  showAction,
  handleDelete,
  handleEdit,
}) {
  const popupRef = useRef(null);

  const onCancel = () => {
    setShowAction(false);
    handleEdit();
  };

  const onDelete = () => {
    setShowAction(false);

    handleDelete();
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
  }, [showAction, setShowAction]);

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
        <button onClick={onCancel}>Edit Board</button>
      </li>
      <li>
        <button onClick={onDelete} className="delete">
          Delete Board
        </button>
      </li>
    </ul>
  );
}
