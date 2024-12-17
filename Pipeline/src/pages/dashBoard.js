import { Headers } from "../../components/Header/Headers";
import TaskCard from "./TaskCard"
import { useState, useEffect} from 'react';
import { useRouter } from "next/navigation"
import style from "../styles/dashBoard/dashBoard.module.css"
export default function DashBoard() {
    const [tasks, setTasks] = useState([])
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState('')
    const [error, SetError] = useState('');


useEffect(() => {
    console.log(localStorage.getItem('isAdmin'))
    if (typeof window !== 'undefined') {
        setIsAdmin(localStorage.getItem('isAdmin'));
    }
    fetch("http://127.0.0.1:8000/create_task/") 
        .then((response) => {
        if (!response.ok) {
            throw new Error('Не удалось загрузить данные');
        }
        return response.json(); 
        })
        .then((data) => {
        setTasks(data.tasks); 
        })
        .catch((error) => {
        console.log(error.message); 
        });
    }, []);

    const handleClick = () => {
        router.push("/createTask");
    };

    return(
        <div className="backround__item">
            <Headers exit = {true}/>
            <div class="bbb1">
            <h1 style={{textAlign:'center'}}>Задачи</h1>
            </div>
            <div style={{display:"flex"}}>
                <div style={{display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
                    <div class="bbb">
                    <h3> Нужно сделать </h3>
                    </div>

                    <ul style={{display:"flex", flexDirection:"column", listStyle:"none"}}>
                        {tasks.map((task) => (
                        <li>
                            {!task.is_choice ? 
                            <TaskCard 
                            name = {task.name} 
                            date_create = {task.date_create} 
                            description = {task.description}
                            output_data = {task.output_data}>
                            </TaskCard> : ''}
                        </li>
                        ))}
                    </ul>

                </div>
                <div style={{flex:"1",textAlign:'center'}}>
                    <div class="bbb2">
                    <h3> Выполняются </h3>
                    </div>
                    <ul style={{all : 'unset'}}>
                        
                    </ul>
                </div>
                <div>
                    {isAdmin === 'true' ? <button className={style.add_task__btn} onClick={handleClick}>Добавить задачу</button>: <span>Вы не являетесь администратором</span>}
                </div>
            </div>
        </div>
    )
}