import styles from './AddTask.module.css';
import {PlusCircle} from "phosphor-react";
import {Task} from "../App";
import {ChangeEvent, FormEvent, InvalidEvent, useState} from "react";

interface AddTaskProps {
  onAddTask: (task: Task) => void;
}

export function AddTask({onAddTask}: AddTaskProps) {
  const [newTask, setNewTask] = useState('');

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    onAddTask({
      id: Math.random(),
      content: newTask,
      status: false
    })

    setNewTask('');
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('A tarefa não pode ser vazia');
  }

  const isNewTaskEmpty = newTask.trim().length === 0;
  return (
    <form onSubmit={handleCreateNewTask}>
      <div className={styles.new_task}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTask}
          onChange={handleNewTaskChange}
          onInvalid={handleNewTaskInvalid}
        />
        <button
          type="submit"
          disabled={isNewTaskEmpty}
        >
          Criar
          <PlusCircle size={20}/>
        </button>
      </div>
    </form>
  )
}