import React, {useState} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from "date-fns/format";
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import "../App.scss"


const FORMAT ='dd/MM/yyyy';
function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
}
const AddTask = ({setshowAddTask, addNewTask})=> {
    const [task, setTask] = useState(""); 
    const [date, setDate] = useState(new Date());  
    return(
        <div className="add-task-dialog">
            <input value={task} onChange={(event)=> setTask(event.target.value)}/>
            <div className="add-task-actions-container">
                <div className="btns-container">
                    <Button disabled={!task} variant="contained" size="small" onClick={()=>
                            {addNewTask(task, date);
                            setshowAddTask(false)}} color="secondary">
                    Add Task
                    </Button>
                    <Button variant="contained" size="small" onClick={()=>
                        {setshowAddTask(false);setTask("")}}>Cancel</Button>
                </div>
                <div className="icons-container">
                    <DayPickerInput 
                        onDayChange={(day)=>setDate(day)} 
                        formatDate={formatDate} 
                        format={FORMAT} 
                        placeholder={`${dateFnsFormat(new Date(),FORMAT)}`}
                        dayPickerProps={{
                            modifiers:{
                                disabled:[{before:new Date()}]
                            },
                        }}/>
                </div>
            </div>
        </div>
    );
}
const TaskHeaderMapping={
    Inbox:"Inbox",
    Today:"Today",
    Next_7:"Next 7 Days",
};

const TaskItems = ({selectedTab, tasks, setTasks})=>{
    let tasksToRender =[...tasks];
    if(selectedTab==="Next_7"){
        tasksToRender=tasksToRender.filter((task) => 
        isAfter(task.date, new Date()) && isBefore(task.date, addDays(new Date(),7)))
    }
    if(selectedTab==="Today"){
        tasksToRender=tasksToRender.filter((task) => isToday(task.date))
    }
    function onDelete(selectedI) {
        const newtasksToRender = tasksToRender.filter(function (el, i) {
          return i !== selectedI;
        });
        setTasks(newtasksToRender);
      }
    return (
        <div className="task-items-Container"> 
        {tasksToRender.map((task,i)=>
        (<div className="task-item" key={i}>
            <p className="print-task">{task.text}</p>
            <p>{dateFnsFormat(task.date,FORMAT)}</p>
            <IconButton aria-label="delete" onClick={()=>onDelete(i)}>
                <DeleteIcon />
            </IconButton>
            
        </div>)) }
        </div>
       
    );
}
const Tasks = ({selectedTab}) => {
    const [showAddTask, setshowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);
    const addNewTask=(text, date)=>{
        const newTaskItem = {text, date}
        setTasks([...tasks, newTaskItem]);
    }
    return (
        <div className="task">
            <h1>{TaskHeaderMapping[selectedTab]}</h1>
            {selectedTab==="Inbox" ? <div className="add-task-btn" 
                onClick={()=>showAddTask ? setshowAddTask(false):setshowAddTask(true)}>
                <span className="plus">+</span>
                <span className="add-task-text">Add Task</span>
            </div> : null}
            {showAddTask && <AddTask addNewTask={addNewTask} setshowAddTask={setshowAddTask}/>}
            {tasks.length>0 ? <TaskItems tasks={tasks} selectedTab={selectedTab} setTasks={setTasks}/> : <p>No tasks yet</p>}
        </div>
    );
}

export default Tasks
