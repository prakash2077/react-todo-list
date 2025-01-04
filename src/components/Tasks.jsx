import { toast } from "react-toastify";
import Task from "./Task"
import { useState, useEffect } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  useEffect(
      () => {
      const localTasks = localStorage.getItem('savedTasks');
      localTasks ? setTasks(JSON.parse(localTasks)) : console.log('No Saved Tasks');
      const localCompletedTasks = localStorage.getItem('completedTasks');
      localCompletedTasks ? setCompletedTasks(JSON.parse(localCompletedTasks)) : console.log("No Saved Completed Tasks");
    }
    ,[])


  const taskCompleted =  (index)=>{
    const newCompletedTasks = [...completedTasks || [], tasks[index]];
    setCompletedTasks(newCompletedTasks);
    const updatedTasks = tasks.filter((_,i)=>i!=index);
    setTasks(updatedTasks);
    localStorage.setItem('savedTasks', JSON.stringify(updatedTasks));
    localStorage.setItem('completedTasks', JSON.stringify(newCompletedTasks));
  }

  const undoTask = (index) => {
    const updatedTasks = [...tasks, completedTasks[index]];
    setTasks(updatedTasks);
    const newCompletedTasks = completedTasks.filter((_,i)=>i!=index);
    setCompletedTasks(newCompletedTasks);
    localStorage.setItem('savedTasks', JSON.stringify(updatedTasks));
    localStorage.setItem('completedTasks', JSON.stringify(newCompletedTasks));
  }

  const clearCompletedTasks = () => {
    const emptyTasks = [];
    setCompletedTasks(emptyTasks);
    localStorage.setItem('completedTasks', emptyTasks);
    toast.success("Successfully Cleared")
  }

  return (
    <>
    
    <div className="tasks">
      <h2>All Tasks</h2>
      {tasks ? tasks.map((task, index) => {
        return <Task taskText={task} handleClick={()=>{taskCompleted(index)}} key={task+index} />
      }) : <p className="task">No Tasks! Add new Tasks</p>}
      {completedTasks?
      <>
        <h2>Completed Tasks</h2>
      {completedTasks.map((task, index)=>{
        
        return (
        <Task taskText={task} handleClick={()=>{undoTask(index)}} key={task+index} checkBoxState={task} />
        );
      })}

      <button className="submit custom-submit" onClick={clearCompletedTasks}>Clear Completed Tasks</button>
      </> : null}
    </div>

    </>
  )
}

export default Tasks