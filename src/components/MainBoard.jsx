import { useDispatch, useSelector } from "react-redux";
import { boards, setActiveTask } from "../redux/boardSlice";
import Button from "./Button";
import { openModal } from "../redux/modalSlice";

export default function MainBoard() {
  const allBoards = useSelector(boards);
  const dispatch = useDispatch();
  const activeBoard = allBoards.filter((board) => board.isActive === true);

  const listTheBoardsWithTasks = activeBoard[0]?.columns?.map(
    (board, index) => {
      return (
        <li className="mainboard__columns--single overflow-slider" key={index}>
          <div className="mainboard__columns--single-title">
            <h4>
              {board.name} ({board.tasks.length})
            </h4>
          </div>

          <ul className="mainboard__columns--tasks">
            {board?.tasks?.length >= 1 ? (
              board?.tasks?.map((task, i) => {
                const subTaskComleted = task.subtasks.filter(
                  (status) => status.isCompleted
                );
                return (
                  <li
                    key={i}
                    className="mainboard__columns--tasks-single "
                    onClick={() => {
                      dispatch(setActiveTask({ task, board }));
                      dispatch(openModal("taskDetail"));
                    }}
                  >
                    <h3>{task.title}</h3>
                    <p>
                      {subTaskComleted.length} of {task.subtasks.length}{" "}
                      subtasks
                    </p>
                  </li>
                );
              })
            ) : (
              <div className="Empty__task">
                <p>No Task AVailable</p>

                <Button
                  className="primary"
                  onClick={() => dispatch(openModal("addTask"))}
                >
                  Create Task
                </Button>
              </div>
            )}
          </ul>
        </li>
      );
    }
  );

  return (
    <main className="mainboard">
      <ul className="mainboard__columns">
        {activeBoard.length > 0 ? (
          <>
            {listTheBoardsWithTasks}
            <button
              className="create__column"
              onClick={() => dispatch(openModal("editBoard"))}
            >
              <h2>create column +</h2>
            </button>
          </>
        ) : (
          <div className="boards__unavailable">
            <h2>No Boards Available</h2>
            <Button
              className="primary"
              onClick={() => dispatch(openModal("addBoard"))}
            >
              Create New Board
            </Button>
          </div>
        )}
      </ul>
    </main>
  );
}
