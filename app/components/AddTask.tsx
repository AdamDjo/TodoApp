'use client';
import React, { FormEventHandler, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Modal from './Modal';
import { addTodo } from '@/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTextValue, setNewTextValue] = useState<string>('');

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTextValue,
    });
    setNewTextValue('');
    setModalOpen(false);
    router.refresh();
  };
  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add new Task <FaPlus size={12} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input
              value={newTextValue}
              onChange={(e) => setNewTextValue(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-full"
            />
            <button className="btn">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
