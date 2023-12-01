import { useDispatch } from "react-redux";
import { closeModal } from "../redux/modalSlice";
// import { setActiveTask } from "../redux/boardSlice";

export default function Modal({ children, showModal }) {
  const dispatch = useDispatch();
  const handleShowModal = (e) => {
    if (e.target.classList[0] === "modal__wrapper") {
      dispatch(closeModal());
      // dispatch(setActiveTask(null));
    }
  };

  return (
    <div
      className={`modal__wrapper ${showModal ? "showModal" : ""}`}
      onClick={handleShowModal}
    >
      <div className="modal__content">{children}</div>
    </div>
  );
}
