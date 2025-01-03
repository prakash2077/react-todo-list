import Task from "./Task"
import { useState, useEffect } from 'react';

const Tasks = () => {

  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  useEffect(
      () => {
      const localTasks = localStorage.getItem('savedTasks');
      setTasks(JSON.parse(localTasks));
      const localCompletedTasks = localStorage.getItem('completedTasks');
      setCompletedTasks(JSON.parse(localCompletedTasks));
    }
    ,[])

  useEffect(
    ()=>{
      console.log('tasks updated')
    }
    ,[tasks])


  const taskCompleted =  (index)=>{
    const newCompletedTasks = [...completedTasks || [], tasks[index]];
    setCompletedTasks(newCompletedTasks);
    const updatedTasks = tasks.filter((_,i)=>i!=index);
    setTasks(updatedTasks);
    localStorage.setItem('savedTasks', JSON.stringify(updatedTasks));
    localStorage.setItem('completedTasks', JSON.stringify(newCompletedTasks));
  }

  const undoTask = (index) => {
    // const newCompletedTasks = [...completedTasks, tasks[index]];
    const updatedTasks = [...tasks, completedTasks[index]];
    // setCompletedTasks(newCompletedTasks);
    setTasks(updatedTasks);
    // const updatedTasks = tasks.filter((_,i)=>i!=index);
    const newCompletedTasks = completedTasks.filter((_,i)=>i!=index);
    // setTasks(updatedTasks);
    setCompletedTasks(newCompletedTasks);
    localStorage.setItem('savedTasks', JSON.stringify(updatedTasks));
    localStorage.setItem('completedTasks', JSON.stringify(newCompletedTasks));
  }

  return (
    <>
    
    <div className="tasks">
      <h2>All Tasks</h2>
      {tasks ? tasks.map((task, index) => {
        return <Task taskText={task} handleClick={()=>{taskCompleted(index)}} key={task+index} />
      }) : <p className="task">No Tasks! Add new Tasks</p>}
      {completedTasks ?
      <>
        <h2>Completed Tasks</h2>
      {completedTasks.map((task, index)=>{
        
        return (
        <Task taskText={task} handleClick={()=>{undoTask(index)}} key={task+index} checkBoxState={task} />
        );
      })}
      </> : null}
    </div>

    </>
  )
}

export default Tasks