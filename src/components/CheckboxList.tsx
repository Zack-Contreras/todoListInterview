import * as React from "react";
import List from "@mui/material/List";
import { v4 as uuidv4 } from "uuid";
import TaskItem from "./TaskItem";
import TextFilter from "./TextFilter";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import TaskSummary from "./TaskSummary";

export interface Task {
  taskName: string;
  taskStatus: boolean;
  id: string;
}

export default function CheckboxList() {
  const [tasks, setTasks] = React.useState([
    {
      taskName: "first task",
      taskStatus: false,
      id: "1010101",
    },
  ]);
  const [newTask, setNewTask] = React.useState("");
  const [filterText, setFilterText] = React.useState("");

  // load the saved todos from local storage on mount
  React.useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTasks(JSON.parse(savedTodos));
    }
  }, []);

  // handle the update of localstorage with todos
  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);

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

  const submitHandler = (e) => {
    e.preventDefault();
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
    <main>
      <div className="todo-filter">
        <TextFilter
          disabled={tasks?.length === 0}
          label="Task filter"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        {tasks
          .filter((task) =>
            task.taskName
              .toLocaleLowerCase()
              .includes(filterText.toLocaleLowerCase())
          )
          .map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                deleteHandler={deleteHandler}
                checkboxHandler={onCheckboxClick}
              />
            );
          })}
      </List>
      <form onSubmit={submitHandler} className="user-input">
        <TextField
          value={newTask}
          onChange={inputHandler}
          id="add-new-todo-input"
          placeholder="Train with master yoda"
          variant="standard"
          name="new-todo"
        />
        <Button type="submit" variant="contained" endIcon={<AddCircleIcon />}>
          Create Task
        </Button>
      </form>
      <section>
        <TaskSummary tasks={tasks} />
      </section>
    </main>
  );
}
