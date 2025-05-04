import { toast } from "react-toastify";
import Task from "./Task"
import { useState, useEffect } from 'react';
import db from '../appwrite/databases';
import { Query } from "appwrite";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect( ()=>{
    // Listing out all the Tasks in Uncompleted and Completed Tasks
    db.Tasks.list([Query.orderDesc("$createdAt")]).then((response)=>{
      const taskDocs = response.documents;
      taskDocs.map((task)=>{
        setTasks((prevTasks)=>[...prevTasks, task]);
      })
    }),
    db.CompletedTasks.list([Query.orderDesc("$createdAt")]).then((response)=>{
      const completedTaskDocs = response.documents;
      completedTaskDocs.map((task)=>{
        setCompletedTasks((prevTasks)=>[...prevTasks, task]);
      })
    })    
  }, [])

  const taskCompleted = async (index, detail) => {
    // Update the State of Tasks
    const newTasks = tasks.filter((_) => _.$id !== index);
    setTasks(newTasks);

    try {
      // Create a CompletedTask and Delete the Task concurrently
      const [res] = await Promise.all([
        db.CompletedTasks.create({ detail: detail }),
        db.Tasks.delete(index), // Fire and forget, no need to wait for this
      ]);

      // Update the State of Completed Tasks
      const newCompletedTasks = [...completedTasks, { detail: res.detail, $id: res.$id }];
      setCompletedTasks(newCompletedTasks);

    } catch (error) {
      toast.error("Failed to complete the task.");
    }
  }

  const undoTask = async (index, detail) => {
    // remove from completedTasks State
    const newCompletedTasks = completedTasks.filter((_)=> _.$id != index);
    setCompletedTasks(newCompletedTasks);
    try{
    // remove from completedTasks
    // add to tasks
    const [res] = await Promise.all([
      db.Tasks.create({detail: detail}),
      db.CompletedTasks.delete(index)
    ])
    
    // add to Tasks State
    const newTasks = [...tasks, {detail: res.detail, $id: res.$id}]
    setTasks(newTasks);
  }catch(error){
    toast.error("Failed!")
  }
  }

  const clearCompletedTasks = async () => {
    const emptyTasks = [];
    setCompletedTasks(emptyTasks);
    // List all completedTasks Ids
    const res = await db.CompletedTasks.list().then(
      (response)=>{
        const tempDocs = response.documents;
        tempDocs.map((doc)=>{
          // Delete Each one
          db.CompletedTasks.delete(doc.$id);
        })
      }

    )
  }

  return (
    <>
      <div className="tasks">
      <h2>All Tasks</h2>
      {tasks ? tasks.map((task) => {
        return <Task taskText={task.detail} handleClick={()=>{taskCompleted(task.$id, task.detail)}} key={task.$id} />
      }) : <p className="task">No Tasks! Add new Tasks</p>}
      {completedTasks?
      <>
        <h2>Completed Tasks</h2>
      {completedTasks.map((task)=>{
        
        return (
        <Task taskText={task.detail} handleClick={()=>{undoTask(task.$id, task.detail)}} key={task.$id} checkBoxState={task} />
        );
      })}

      <button className="submit custom-submit" onClick={clearCompletedTasks}>Clear Completed Tasks</button>
      </> : null}
    </div>

    </>
  )
}

export default Tasks