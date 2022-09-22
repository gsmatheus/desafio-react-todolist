import {Header} from "./components/Header";
import {AddTask} from "./components/AddTask";

import './global.css';
import styles from './App.module.css';
import {CardTask} from "./components/CardTask";
import {useEffect, useState} from "react";

export interface Task {
  id?: number;
  content: string;
  status: boolean;
}

function getStorageValue<T>(key: string, defaultValue: T) {
  const item = localStorage.getItem(key)
  return item ? (JSON.parse(item) as T) : defaultValue
}

function App() {
  const [tasks, setTask] = useState<Task[]>(getStorageValue('@tasks', []));

  useEffect(() => {
    localStorage.setItem('@tasks', JSON.stringify(tasks))
  }, [tasks])

  function addNewTask(task: Task) {
    setTask([...tasks, task]);
  }

  function changeTaskStatus(task: Task) {
    const newTasks = tasks.map(t => {
      if (t.id === task.id) {
        return {
          ...t,
          status: task.status
        }
      }
      return t;
    })
    setTask(newTasks);
  }

  function deleteTask(task: Task) {
    const newTasks = tasks.filter(t => t.id !== task.id);
    setTask(newTasks);
  }

  return (
    <div>
      <Header/>
      <main>
        <AddTask onAddTask={addNewTask}/>
        <div className={styles.taskHeader}>
          <p>Tarefas criadas <span>{tasks.length}</span></p>
          <p>Concluídas
            <span>
              {
                tasks.filter(t => t.status).length
              } de {tasks.length}
            </span>
          </p>
        </div>
        {
          tasks.map(task => {
            return (
              <CardTask
                key={task.id}
                task={task}
                onChangeTaskStatus={changeTaskStatus}
                onDeleteTask={deleteTask}
              />
            )
          })
        }
      </main>
    </div>
  )
}

export default App
