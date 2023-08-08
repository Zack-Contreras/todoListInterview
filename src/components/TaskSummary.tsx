import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Task } from "./CheckboxList";
import SummaryList from "./SummaryList";

interface ITaskSummary {
  tasks: Task[];
}
function TaskSummary({ tasks }: ITaskSummary) {
  // we could memoize these for improved performance but decided not to as the gain wouldn't be worth the cost within this small application
  const completedTasks = tasks.filter((task) => task.taskStatus);
  const remainingTasks = tasks.filter((task) => !task.taskStatus);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h4>Task Summary</h4>
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <SummaryList
            areCompleted
            label="Completed"
            taskList={completedTasks}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <SummaryList
            areCompleted={false}
            label="Remaining"
            taskList={remainingTasks}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TaskSummary;
