import { useState } from "react";
import TasksSidebar from "./components/TasksSidebar";
import NewTask from "./components/NewTask";
import NoTaskSelected from "./components/NoTaskSelected";
import SelectedTask from "./components/SelectedTask";
import NavBar from "./components/NavBar";

function App() {
  const [taskState, setTaskState] = useState({
    selectedTaskId: undefined,
    tasks: [],
    comments: []
  });

  function handleAddComment(text) {
    setTaskState((prevState) => {
      const commentId = Math.random();
    const newComment = {
      text: text,
      taskId: prevState.selectedTaskId,
      id: commentId,
    };
      return {
        ...prevState,
        comments: [newComment, ...prevState.comments],
      };
    });
  }

  function handleDeleteComment(id) {
    setTaskState((prevState) => {
      return {
        ...prevState,
        comments: prevState.comments.filter(
          (comment) => comment.id !== id
        ),
      };
    });
  }

  function handleSelectTask(id) {
    setTaskState((prevState) => {
      return {
        ...prevState,
        selectedTaskId: id,
      };
    });
  }
  function handleAddTask() {
    setTaskState((prevState) => {
      return {
        ...prevState,
        selectedTaskId: null,
      };
    });
  }

  function handleCancelAddTask() {
    setTaskState((prevState) => {
      return {
        ...prevState,
        selectedTaskId: undefined,
      };
    });
  }

  function handleNewTask(taskData) {
    
    setTaskState((prevState) => {
      const taskId = Math.random();
      const newTask = {
      ...taskData,
      id: taskId,
    };
      return {
        ...prevState,
        selectedTaskId: undefined,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleUpdateTask(id, status) {
    //console.log(id);
    setTaskState((prevState) => {
      //console.log(...prevState.tasks);
      let newState = { ...prevState };
      for (let i in newState.tasks) {
        if (newState.tasks[i].id === id) {
          newState.tasks[i].status = status;
        }
      }
      return {
        ...newState,
      };
    });
  }

  function handleDeleteTask() {
    setTaskState((prevState) => {
      return {
        ...prevState,
        selectedTaskId: undefined,
        tasks: prevState.tasks.filter(
          (task) => task.id !== prevState.selectedTaskId
        ),
      };
    });
  }

  //console.log(taskState);
  //console.log(taskState.comments);
  const selectedTask = taskState.tasks.find(
    (task) => task.id === taskState.selectedTaskId
  );
  let content = (
    <SelectedTask
      task={selectedTask}
      onDelete={handleDeleteTask}
      onUpdate={handleUpdateTask}
      onAddComment={handleAddComment}
      onDeleteComment={handleDeleteComment}
      comments={taskState.comments}
    />
  );

  if (taskState.selectedTaskId === null) {
    content = <NewTask onAdd={handleNewTask} onCancel={handleCancelAddTask} />;
  } else if (taskState.selectedTaskId === undefined) {
    content = <NoTaskSelected onAddTask={handleAddTask} />;
  }
  return (
    <main className="h-screen">
      <div className="md:hidden bg-blue-600 sticky top-0 z-10">
       <NavBar onAddTask={handleAddTask} 
       tasks={taskState.tasks}
       onSelectTask={handleSelectTask}
       selectedTaskId={taskState.selectedTaskId}/>
      </div>
      <div className="flex">
      <TasksSidebar 
        onAddTask={handleAddTask}
        tasks={taskState.tasks}
        onSelectTask={handleSelectTask}
        selectedTaskId={taskState.selectedTaskId}
      />
      {content}
      </div>
    </main>
  );
}

export default App;
