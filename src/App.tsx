import "./App.css";
import CheckboxList from "./components/CheckboxList";

/**
 * 

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

function App() {
  return (
    <div>
      <CheckboxList />
    </div>
  );
}

export default App;
