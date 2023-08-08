import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";

/**
 * 
ashok.thota9@gmail.com

List component should:

    Should store list of tasks

    Render a list of Task components, passing each task's content and completion status as props.

    Include an input field and a button to add new tasks to the list

 

Task component should:

 

    Receive props for the task's content and completion status

    Display the task's content

    Include a checkbox that users can click to mark the task as completed.

    Include a button to remove the task from the list

 

Add local storage functionality to persist the task list after the user refreshes the page

Implement a search/filter feature to allow users to search for specific tasks.

Provide a summary of completed tasks and remaining tasks at the bottom of the list.

 

 

Use css rich component - Material UI
 */

//{taskName: string, taskStatus: boolean}
//2 components, list and task component
// list component has list of tasks and task component has task content and a boolean state with completed or not shown as checkbox
// inlclude a button to add a new task

interface ICustomTask {
  task: Task;
  checkboxHandler: (taskId: string) => void;
  deleteHandler: (taskId: string) => void;
}

interface Task {
  taskName: string;
  taskStatus: boolean;
  id: string;
}
const CustomTask = ({ task, checkboxHandler, deleteHandler }: ICustomTask) => {
  return (
    <li>
      <input
        onChange={() => checkboxHandler(task.id)}
        checked={task.taskStatus}
        type="checkbox"
        id={task.taskName}
        name={task.taskName}
      />
      {task.taskName}
      <IconButton onClick={() => deleteHandler(task.id)} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </li>
  );
};

function App() {
  const [tasks, setTasks] = useState([
    {
      taskName: "first task",
      taskStatus: false,
      id: "1010101",
    },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTasks(JSON.parse(savedTodos));
    }
  }, []);

  // handle the update of localstorage with todos
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);

  console.log(tasks);

  const onCheckboxClick = (taskId: string) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            taskStatus: !task.taskStatus,
          };
        } else {
          return task;
        }
      });
    });
  };

  const inputHandler = (e) => {
    setNewTask(e.target.value);
  };

  const buttonHandler = () => {
    if (newTask.length) {
      setTasks((prev) => {
        return [
          ...prev,
          {
            taskName: newTask,
            taskStatus: false,
            id: uuidv4(),
          },
        ];
      });
      setNewTask("");
    }
  };

  const deleteHandler = (taskId: string) => {
    setTasks((prev) => {
      return prev.filter((task) => task.id !== taskId);
    });
  };

  return (
    <div>
      <div className="filter">
        <TextField
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          id="filled-basic"
          label="ToDo filter"
          variant="filled"
        />
      </div>
      <ul>
        {tasks
          .filter((task) =>
            task.taskName.toLowerCase().includes(filterText.toLocaleLowerCase())
          )
          .map((task) => (
            <CustomTask
              key={task.id}
              checkboxHandler={onCheckboxClick}
              deleteHandler={deleteHandler}
              task={task}
            />
          ))}
      </ul>
      <div className="user-input">
        <input value={newTask} onChange={inputHandler} type="text" />
        <button type="submit" onClick={buttonHandler}>
          Add Task
        </button>
      </div>
    </div>
  );
}

export default App;
