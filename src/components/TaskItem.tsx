import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "./CheckboxList";

interface ITaskItem {
  task: Task;
  checkboxHandler: (taskId: string) => void;
  deleteHandler: (taskId: string) => void;
}
function TaskItem({ task, checkboxHandler, deleteHandler }: ITaskItem) {
  return (
    <ListItem
      key={task.id}
      secondaryAction={
        <IconButton
          onClick={() => deleteHandler(task.id)}
          edge="end"
          aria-label="comments"
        >
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton
        role={undefined}
        onClick={() => checkboxHandler(task.id)}
        dense
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={task.taskStatus}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": task.id }}
          />
        </ListItemIcon>
        <ListItemText
          id={task.id}
          primary={task.taskName}
          sx={{
            overflowWrap: "break-word",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default TaskItem;
