import { useState } from "react";
import { Headers } from "../../components/Header/Headers";
import style from "../styles/CreateTask/CreateTask.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"; // Импортируем useForm

export default function CreateTask() {
    const router = useRouter();
    const [description, setDescription] = useState("");
    const [inputData, setInputData] = useState("");
    const [outputData, setOutputData] = useState("");
    const [name, setName] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const taskData = {
            description: data.Description,
            inputData: data.InputData || "",
            outputData: data.OutputData || "",
            name: data.Name,
        };

        console.log(taskData);

        try {
            const response = await fetch("http://127.0.0.1:8000/create_task/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(taskData),
            });

            if (response.ok) {
                console.log("Задача успешно создана!");
                router.push("/dashBoard");
            } else {
                console.log("Ошибка при создании задачи");
            }
        } catch (error) {
            console.log("Ошибка:", error);
        }
    };

    return (
        <div className="backround__item" >
            <Headers exit={true} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.task_input__block}>
                    <h1>Создай задачу!</h1>

                    <div className={style.input_col_block}>
                        <h3>Введите название</h3>
                        <input
                            placeholder="Название"
                            style={{ width: "90%", height: "35px", paddingLeft:"15px",borderRadius:"20px", marginLeft: '5px', resize: "none" }}
                            {...register("Name", {
                                required: "*Поле обязательно для заполнения",
                                pattern: {
                                    value: /^[А-Яа-яЁёa-zA-Z0-9\s-]{2,}$/,
                                    message: "*Данные должны содержать минимум 2 символа и могут включать буквы, цифры и пробелы",
                                },
                                validate: {
                                    noSpecialChars: (value) => !/[!@#$%^&*(),.?":{}|<>]/.test(value) || "*Недопустимые символы в названии",
                                }
                            })}
                        />
                        {errors.Name && <span className={style.error}>{errors.Name.message}</span>} 
                    </div>

                    <div className={style.input_col_block}>
                        <h3>Введите описание</h3>
                        <input
                            placeholder="Описание"
                            style={{ width: "90%", height: "75px", paddingLeft:"15px",borderRadius:"20px", marginLeft: '5px', resize: "none" }}
                            {...register("Description", {
                                required: "*Поле обязательно для заполнения",
                            })}
                            
                        />
                        {errors.Description && <span className={style.error}>{errors.Description.message}</span>} {/* Ошибка описания */}
                    </div>

                    <div className={style.input_col_block}>

                        <h3>Введите входные данные</h3>
                        <input
                            placeholder="Входные данные"
                            style={{ width: "90%", height: "35px", paddingLeft:"15px",borderRadius:"20px", marginLeft: '5px', resize: "none" }}
                            {...register("InputData", {
                                required: "*Поле обязательно для заполнения",
                            })}
                        />
                        {errors.InputData && <span className={style.error}>{errors.InputData.message}</span>} {/* Ошибка входных данных */}
                    </div>

                    <div className={style.input_col_block}>
                        <h3>Введите выходные данные</h3>
                        <input
                            placeholder="Выходные данные"
                            style={{ width: "90%", height: "75px", paddingLeft:"15px",borderRadius:"20px", marginLeft: '5px', resize: "none" }}
                            {...register("OutputData", {
                                required: "*Поле обязательно для заполнения",
                            })}
                        />
                        {errors.OutputData && <span className={style.error}>{errors.OutputData.message}</span>} {/* Ошибка выходных данных */}
                    </div>

                    <button type="submit" className={style.submit__btn}>Отправить</button>
                </div>
            </form>
        </div>
    );
}