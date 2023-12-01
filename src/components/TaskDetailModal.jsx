import { useDispatch, useSelector } from "react-redux";
import thumbIcon from "../assets/thumb.svg";
import { boards, changeTaskColumn, setTaskStatus } from "../redux/boardSlice";
import toast from "react-hot-toast";
import ActionButtons from "./ActionButtons";
import dotIcon from "../assets/dots.svg";
import { useState } from "react";
import { openModal } from "../redux/modalSlice";

export default function EditTask() {
  const [showAction, setShowAction] = useState(false);
  const dispatch = useDispatch();
  const {
    board: { name },
    task: activeTasks,
  } = useSelector((state) => state.board.taskDetail);
  const allBoards = useSelector(boards);
  const activeBoard = allBoards.filter((board) => board.isActive);
  const activeTask = activeBoard[0].columns
    .filter((cl) => cl.name === name)[0]
    .tasks.filter((task) => task.title === activeTasks.title)[0];

  const handleTaskStatus = (subTask, index) => {
    dispatch(setTaskStatus({ subTask, name, index }));

    toast.success(
      `${subTask.title} is marked ${
        subTask.isCompleted ? "pending" : "Completed"
      }`
    );
  };

  const handleDelete = () => {
    dispatch(openModal("deleteTask"));
  };
  const handleEdit = () => {
    dispatch(openModal("editTask"));
  };

  const handleTaskChange = (e) => {
    dispatch(
      changeTaskColumn({
        name,
        updatedName: e.target.value,
        title: activeTasks.title,
      })
    );
  };

  const subTasksList = activeTask.subtasks.map((task, index) => {
    return (
      <button
        onClick={() => handleTaskStatus(task, index)}
        key={index}
        className={`${task.isCompleted ? "active" : ""}`}
      >
        <span className="custom__cheqbox">
          <img src={thumbIcon} alt="thumbIcon" />
        </span>

        <span className="title">{task.title}</span>
      </button>
    );
  });

  return (
    <div className="taskDetail">
      <div className="taskDetail__head">
        <h2>{activeTask.title}</h2>

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

      {activeTask.description && (
        <p className="description">{activeTask.description}</p>
      )}

      <div className="taskDetail__body">
        <div className="taskDetail__subtask">
          <h4>Sub-Tasks</h4>
          <div className="taskDetail__subtask-list">{subTasksList}</div>
        </div>

        <div className="select__status">
          <select
            name="status"
            id="status"
            // value={task.status}
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
      </div>
    </div>
  );
}
