import { ITask } from '@/types/tasks';
import React from 'react';
import Task from './Task';

interface TodoListProps {
  tasks: ITask[];
}
const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Tasks</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((item) => (
            <Task key={item.id} task={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
