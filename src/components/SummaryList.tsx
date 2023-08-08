import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import PendingIcon from "@mui/icons-material/Pending";
import CheckIcon from "@mui/icons-material/Check";
import { Task } from "./CheckboxList";

interface ISummaryList {
  taskList: Task[];
  label: string;
  areCompleted: boolean;
}
export default function SummaryList({
  areCompleted,
  taskList,
  label,
}: ISummaryList) {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360 }}
      subheader={<ListSubheader>{label}</ListSubheader>}
    >
      {taskList.map((task) => (
        <ListItem key={task.id}>
          <ListItemIcon>
            {areCompleted ? <CheckIcon /> : <PendingIcon />}
          </ListItemIcon>
          <ListItemText id="switch-list-label-wifi" primary={task.taskName} />
        </ListItem>
      ))}
    </List>
  );
}
