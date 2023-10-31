import { useState } from "react";
import dotIcon from "../assets/dots.svg";
import ActionButtons from "./ActionButtons";
import { useSelector } from "react-redux";
import { boards } from "../redux/boardSlice";

export default function MainBoard() {
  const [showPopup, setShowPop] = useState(false);
  const allBoards = useSelector(boards);
  const activeBoard = allBoards.filter((board) => board.isActive === true);

  const listTheBoardsWithTasks = activeBoard[0]?.columns?.map(
    (board, index) => {
      return (
        <li className="mainboard__columns--single" key={index}>
          <div className="mainboard__columns--single-title">
            <h4>
              {board.name} ({board.tasks.length})
            </h4>
            <div className="mainboard__columns--single-action">
              <button className="" onClick={() => setShowPop((prev) => !prev)}>
                <img src={dotIcon} alt="doticon" width={4} />
              </button>
              <ActionButtons
                showAction={showPopup}
                setShowAction={setShowPop}
              />
            </div>
          </div>

          <ul className="mainboard__columns--tasks">
            {board?.tasks?.map((task, i) => {
              return (
                <li key={i} className="mainboard__columns--tasks-single">
                  <h3>{task.title}</h3>
                  <p>1 of {task.subtasks.length} subtasks</p>
                </li>
              );
            })}
          </ul>
        </li>
      );
    }
  );

  return (
    <main className="mainboard">
      <ul className="mainboard__columns">
        {listTheBoardsWithTasks}

        <li className="create__column">
          <h2>create column</h2>
        </li>
      </ul>
    </main>
  );
}
