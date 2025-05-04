import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import db from '../appwrite/databases';

const Hero = () => {
  const [newTask, setNewTask] = useState('');
  const onSubmit = async () => {
    if(newTask != ''){
      
      // Checking if the task is already existing
      const res = await db.Tasks.list();
      const existingTasks = res.documents.map((doc) => doc.detail.toLowerCase());
      console.log(existingTasks)
      if (existingTasks.includes(newTask.toLowerCase())){
        toast.error("Task already Exists");
        return;
      }

      // Create the Task
      await db.Tasks.create({"detail":newTask});
      toast.success('Task Added Successfully');

      setNewTask('');
    }else{
      toast.warn('Task is Empty');
    }}
  

  const handleKeyDown = (e)=>{
    if (e.key == "Enter"){
      onSubmit();
    }
  }

  return (
    <>
      <div className="container">
        <h1>What's on your mind?</h1>

        <input placeholder='Wash Clothes..' className='text' onChange={(e) => { setNewTask(e.target.value) }} value={newTask} onKeyDown={(e) => { handleKeyDown(e) }} type="text" />
        <input className='submit' type="button" value="Submit" onClick={onSubmit} />
      </div>
    </>
  )
}

export default Hero;