import { useState } from "react";
import Button from "./Button";
import Logo from "./Logo";
import dotIcon from "../assets/dots.svg";
import ActionButtons from "./ActionButtons";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/modalSlice";

export default function Header({ setSidebarOpen, sidebarOpen }) {
  const [showAction, setShowAction] = useState(false);
  const boards = useSelector((state) => state.board.boards);
  const dispatch = useDispatch();
  const activeBoard = boards.filter((board) => board.isActive);

  const handleDelete = () => {
    dispatch(openModal("deleteBoard"));
  };

  const handleEdit = () => {
    dispatch(openModal("editBoard"));
  };

  return (
    <>
      <div className="header">
        {!sidebarOpen && (
          <div className="header__logo">
            <Logo setSidebarOpen={setSidebarOpen} />
          </div>
        )}

        <div className="header__content">
          <h2 className="header__content--title">
            {activeBoard[0]?.name ? activeBoard[0]?.name : "Create New Board"}
          </h2>

          {activeBoard.length > 0 ? (
            <>
              <div className="header__content--action">
                <Button
                  className="primary"
                  type="button"
                  onClick={() => dispatch(openModal("addTask"))}
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
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                </div>
              </div>
            </>
          ) : (
            <Button
              className="primary"
              onClick={() => dispatch(openModal("addBoard"))}
            >
              Create New Board
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
