'use client';
import { ITask } from '@/types/tasks';
import React, { FormEventHandler, useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { MdOutlineDelete } from 'react-icons/md';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { editTodo, removeTodo } from '@/api';
interface TaskProps {
  task: ITask;
}
const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [OpenModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [OpenModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [tasktoEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: tasktoEdit,
    });

    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await removeTodo(id);
    setOpenModalDelete(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td>
        {task.text}
        {/* edit modal */}
        <Modal modalOpen={OpenModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
              <input
                value={tasktoEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-full"
              />
              <button className="btn flex">Remove</button>
            </div>
          </form>
        </Modal>
        {/* delete modal */}
        <Modal modalOpen={OpenModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="font-bold text-lg">
            Are you sure, you want to delete this task?
          </h3>
          <div className="modal-action">
            <button className="btn" onClick={() => handleDeleteTask(task.id)}>
              YES
            </button>
          </div>
        </Modal>
      </td>
      <td className="flex gap-5">
        <MdModeEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-100"
          size={25}
        />
        <MdOutlineDelete
          onClick={() => setOpenModalDelete(true)}
          cursor="pointer"
          className="text-red-300"
          size={25}
        />
      </td>
    </tr>
  );
};

export default Task;
