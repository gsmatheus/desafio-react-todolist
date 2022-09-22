import styles from './CardTask.module.css';
import {Task} from "../App";
import {Trash} from "phosphor-react";
import {ChangeEvent, useState} from "react";

interface CardTaskProps {
  task: Task;
  onChangeTaskStatus: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

export function CardTask({task, onChangeTaskStatus, onDeleteTask}: CardTaskProps) {
  const {id, content, status} = task;
  const [taskStatus, setTaskStatus] = useState(status);

  function handleTaskStatusChange(event: ChangeEvent<HTMLInputElement>) {
    setTaskStatus(event.target.checked);
    onChangeTaskStatus({
      id,
      content,
      status: event.target.checked
    })
  }

  // @ts-ignore
  function handleDeleteTask(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    onDeleteTask(task);
  }

  const classNameBody = [
    styles.cardBody,
    taskStatus ? styles.cardBodyActive : ''
  ]
  return (
    <div className={classNameBody.join(" ")}>
      <div className={styles.cardContent}>
        <input
          type="checkbox"
          checked={taskStatus}
          onChange={handleTaskStatusChange}
        />
        <div>
          <p>{content}</p>
        </div>
        <a href="" onClick={handleDeleteTask}><Trash/></a>
      </div>
    </div>
  )
}