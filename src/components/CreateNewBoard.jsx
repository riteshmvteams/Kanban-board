import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/modalSlice";
import InputBox from "./InputBox";
import Button from "./Button";
import { useState } from "react";
import { addBoard, boards, editBoard } from "../redux/boardSlice";
import toast from "react-hot-toast";

const formFieldErrors = {
  board: "",
  column: "",
  columnLengthError: "",
};

const CreateNewBoard = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [checkValidation, setCheckValidation] = useState(false);
  const modalState = useSelector((state) => state.modal);
  const allBoards = useSelector(boards);
  const activeBoard = allBoards.filter((board) => board.isActive);
  const OBJ = {
    name: activeBoard[0]?.name,
    isActive: true,
    columns: activeBoard[0]?.columns,
  };

  const [boardDetails, setBoardDetails] = useState(
    modalState.modalType === "editBoard"
      ? OBJ
      : {
          name: "",
          isActive: false,
          columns: [
            {
              name: "Todo",
              tasks: [],
            },
            {
              name: "Doing",
              tasks: [],
            },
          ],
        }
  );

  const validateBoardName = (value) => {
    if (value.trim() === "") {
      formFieldErrors.board = "Board Name is required...";
    } else {
      formFieldErrors.board = "";
    }
  };

  const validateColumnName = (array) => {
    array.forEach((el) => {
      if (el.name.trim() === "") {
        formFieldErrors.column = "Column Name is required...";
      } else {
        formFieldErrors.column = "";
      }
    });
  };

  const handleAddColumns = () => {
    setError(false);
    formFieldErrors.columnLengthError = "";
    setBoardDetails((prev) => ({
      ...prev,
      columns: [
        ...prev.columns,
        {
          name: "",
          tasks: [],
        },
      ],
    }));
  };

  const handleDeleteColumn = (index) => {
    setBoardDetails((prev) => ({
      ...prev,
      columns: prev.columns.filter((el, i) => i !== index),
    }));
  };

  const handleBoardNameChange = (event) => {
    setBoardDetails((prev) => ({
      ...prev,
      name: event.target.value,
    }));

    if (checkValidation) {
      validateBoardName(event.target.value);
    }
  };

  const handleColumnNameChange = (event, index) => {
    setBoardDetails((prev) => ({
      ...prev,
      columns: prev.columns.map((el, i) => {
        if (i === index) {
          return {
            name: event.target.value,
            tasks: el.tasks,
          };
        } else {
          return el;
        }
      }),
    }));

    validateColumnName(
      boardDetails.columns.map((el, i) => {
        if (i === index) {
          return {
            name: event.target.value,
            tasks: el.tasks,
          };
        } else {
          return el;
        }
      })
    );
  };

  const handleCreateBoard = (e) => {
    e.preventDefault();
    setCheckValidation(true);
    validateBoardName(boardDetails.name);
    validateColumnName(boardDetails.columns);

    if (formFieldErrors.board === "" && formFieldErrors.column === "") {
      if (boardDetails.columns.length === 0) {
        setError(true);
        formFieldErrors.columnLengthError = "Atleat Add one column";
      } else {
        // we will do task to add the board here....
        modalState.modalType === "editBoard"
          ? dispatch(editBoard(boardDetails))
          : dispatch(addBoard(boardDetails));
        dispatch(closeModal());
        modalState.modalType === "editBoard"
          ? toast.success(`${boardDetails.name} Board has been Edited`)
          : toast.success(`${boardDetails.name} Board has been created`);
      }
    }
  };

  return (
    <div className="createBoard">
      <div className="createBoard__container">
        <div className="createBoard__head">
          <h2>Create New Board</h2>
          <button onClick={() => dispatch(closeModal())}>
            <UilTimes />
          </button>
        </div>

        <form className="createBoard__form">
          <div className="createBoard__form--board">
            <h4>Board Name</h4>
            <InputBox
              handleChange={handleBoardNameChange}
              placeholder="eg: Design Board"
              name="board_name"
              value={boardDetails.name}
              error={formFieldErrors?.board}
            />
          </div>

          <div className="createBoard__form--columns">
            <h4>Board Columns</h4>
            <ul>
              {boardDetails?.columns?.map((col, index) => {
                return (
                  <li className="" key={index}>
                    <InputBox
                      placeholder={`Type Name of Column`}
                      name="board_name"
                      value={col.name}
                      handleChange={(event) =>
                        handleColumnNameChange(event, index)
                      }
                      error={col.name === "" && formFieldErrors?.column}
                    />

                    <button
                      type="button"
                      onClick={() => handleDeleteColumn(index)}
                    >
                      <UilTimes />
                    </button>
                  </li>
                );
              })}
              {formFieldErrors.columnLengthError && error !== "" && (
                <span>{formFieldErrors.columnLengthError}</span>
              )}
              <Button
                type="button"
                className="white"
                onClick={handleAddColumns}
              >
                Add Columns +
              </Button>
            </ul>
          </div>

          <Button className="primary full-width" onClick={handleCreateBoard}>
            Create New Board
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewBoard;
