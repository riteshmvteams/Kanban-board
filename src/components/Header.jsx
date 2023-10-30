import { useState } from "react";
import Button from "./Button";
import Logo from "./Logo";
import dotIcon from "../assets/dots.svg";
import ActionButtons from "./ActionButtons";
import Modal from "./Modal";

export default function Header({ setSidebarOpen, sidebarOpen }) {
  const [showAction, setShowAction] = useState(false);
  const [taskAddModal, setTaskAddModal] = useState(false);

  return (
    <>
      <div className="header">
        {!sidebarOpen && (
          <div className="header__logo">
            <Logo setSidebarOpen={setSidebarOpen} />
          </div>
        )}

        <div className="header__content">
          <h2 className="header__content--title">Development Board</h2>

          <div className="header__content--action">
            <Button
              className="primary"
              type="button"
              onClick={() => setTaskAddModal(true)}
            >
              + Add New Task
            </Button>

            <div className="action__button-wrapper">
              <button
                className="header__content--more"
                onClick={() => setShowAction((prev) => !prev)}
              >
                <img src={dotIcon} alt="doticon" />
              </button>
              <ActionButtons
                showAction={showAction}
                setShowAction={setShowAction}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal showModal={taskAddModal} setShowModal={setTaskAddModal}>
        <div className="modal__addtask">Add Task Here</div>
      </Modal>
    </>
  );
}
