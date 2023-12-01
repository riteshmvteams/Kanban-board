import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { UilTimes } from "@iconscout/react-unicons";
import { closeModal } from "../redux/modalSlice";
import { deleteTask } from "../redux/boardSlice";
import toast from "react-hot-toast";

export default function DeleteBoard({ title, handleDelete, index }) {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modal.modalType);
  const taskState = useSelector((state) => state?.board?.taskDetail);

  const onDelete = () => {
    handleDelete(index);
    dispatch(closeModal());
    toast.success("Board has been deleted Successfully");
  };

  const handleDeleteTask = () => {
    toast.success("Task has been Deleted Successfully");

    dispatch(deleteTask({ task: taskState?.task, board: taskState?.board }));

    dispatch(closeModal());
  };

  return (
    <div className="delete__modal">
      <div className="delete__modal--head">
        <h3>
          Delete{" "}
          {modalType === "deleteTask"
            ? taskState.task.title + " " + "Task"
            : title + " " + "Board"}
        </h3>

        <button onClick={() => dispatch(closeModal())}>
          <UilTimes />
        </button>
      </div>

      <p>
        Note: <span>This action cannot be undone</span>
      </p>

      <div className="delete__modal--buttons">
        <Button className="simple" onClick={() => dispatch(closeModal())}>
          Cancel
        </Button>
        <Button
          className="danger"
          onClick={modalType === "deleteTask" ? handleDeleteTask : onDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
