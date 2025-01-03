import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Hero = () => {
  const [newTask, setNewTask] = useState('');
  const onSubmit = () => {
    if(newTask != ''){
      const existingTasks = localStorage.getItem('savedTasks');
      if(existingTasks){
        // const existingTasksRa = JSON.parse(existingTasks);
        if(existingTasks.includes(newTask.toLowerCase())){
          toast.error("Task already Exists");
          return;
        }
      }  
      let savedTasks = localStorage.getItem('savedTasks');
      savedTasks = savedTasks ? JSON.parse(savedTasks) : [];
      const tempTasks = [...savedTasks, newTask];
      localStorage.setItem('savedTasks', JSON.stringify(tempTasks));
      toast.success('Task Added Successfully');
      setNewTask('');
    }
    else{
      toast.warn('Task is Empty');
        
    }
  }
  

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

export default Hero