import { useDispatch, useSelector } from "react-redux";
import { UilTimes } from "@iconscout/react-unicons";
import { closeModal } from "../redux/modalSlice";
import InputBox from "./InputBox";
import Button from "./Button";
import { addTask, boards } from "../redux/boardSlice";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddTask() {
  const dispatch = useDispatch();
  const allBoards = useSelector(boards);
  const activeBoard = allBoards.filter((board) => board.isActive);
  const activeTask = useSelector((state) => state?.board?.taskDetail?.task);
  const modalType = useSelector((state) => state.modal.modalType);

  const OBJFORUPDATE = {
    title: activeTask?.title,
    description: activeTask?.description,
    status: activeTask?.status,
    subtasks: activeTask?.subtasks,
  };

  const [task, setTask] = useState(
    modalType === "editTask"
      ? OBJFORUPDATE
      : {
          title: "",
          description: "",
          status: activeBoard[0].columns[0].name,
          subtasks: [
            {
              title: "",
              isCompleted: false,
            },
          ],
        }
  );

  const handleAddSubTasks = () => {
    setTask((prev) => ({
      ...prev,
      subtasks: [
        ...prev.subtasks,
        {
          title: "",
          isCompleted: false,
        },
      ],
    }));
  };

  const handleDeleteSubTask = (index) => {
    setTask((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter((_, i) => i !== index),
    }));
  };

  const handleTaskChange = (event) => {
    setTask((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    // we will validations here

    // after validation we will dispatch and close the modal and show message
    dispatch(addTask(task));
    dispatch(closeModal());
    toast.success("Task Added Successfully");
  };

  const handleSubtaskName = (e, index) => {
    setTask((prev) => ({
      ...prev,
      subtasks: prev.subtasks.map((el, i) => {
        if (i === index) {
          return {
            title: e.target.value,
            isCompleted: false,
          };
        } else {
          return el;
        }
      }),
    }));
  };

  return (
    <div className="createBoard">
      <div className="createBoard__container">
        <div className="createBoard__head">
          <h2>
            {" "}
            {modalType === "editTask" ? "Edit The Task" : "Add New Task"}
          </h2>
          <button onClick={() => dispatch(closeModal())}>
            <UilTimes />
          </button>
        </div>

        <form className="createBoard__form">
          <div className="createBoard__form--board">
            <InputBox
              label="Task Name"
              handleChange={handleTaskChange}
              placeholder="eg: Design Board"
              name="title"
              value={task?.title}
              //   error={formFieldErrors?.board}
            />

            <div className="input__wrapper textArea">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                placeholder="Enter Description of the Task"
                onChange={handleTaskChange}
                value={task.description}
              ></textarea>
            </div>
          </div>

          <div className="createBoard__form--columns">
            <h4>SubTasks:</h4>
            <ul>
              {task?.subtasks.map((el, index) => {
                return (
                  <li className="" key={index}>
                    <InputBox
                      placeholder="Enter Subtask"
                      name="board_name"
                      value={el?.title}
                      handleChange={(e) => handleSubtaskName(e, index)}

                      //   error={col.name === "" && formFieldErrors?.column}
                    />

                    <button
                      type="button"
                      onClick={() => handleDeleteSubTask(index)}
                    >
                      <UilTimes />
                    </button>
                  </li>
                );
              })}
              <Button
                type="button"
                className="white"
                onClick={handleAddSubTasks}
              >
                Add Subtasks +
              </Button>
            </ul>
          </div>

          <div className="select__status">
            <select
              name="status"
              id="status"
              value={task.status}
              onChange={handleTaskChange}
            >
              {activeBoard[0]?.columns.map((board, index) => {
                return (
                  <option key={index} value={board.name}>
                    {board.name}
                  </option>
                );
              })}
            </select>
          </div>

          <Button className="primary full-width" onClick={handleAddTask}>
            Create New Task
          </Button>
        </form>
      </div>
    </div>
  );
}
