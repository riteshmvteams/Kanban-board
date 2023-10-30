export default function Modal({ children, setShowModal, showModal }) {
  const handleShowModal = (e) => {
    if (e.target.classList[0] === "modal__wrapper") {
      setShowModal(false);
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
