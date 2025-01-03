import { useState } from 'react'

const Task = ({ taskText, handleClick, checkBoxState = false }) => {

  const [isChecked, setIsChecked] = useState(checkBoxState);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  }

  return (
    <>
      <div className="task">
        <input type="checkbox" id="" onClick={handleClick} onChange={handleChange} checked={isChecked} />
        {
          isChecked ? <strike> {taskText }</strike> : <>{taskText}</>
        }
      </div>
    </>
  )
}

export default Task