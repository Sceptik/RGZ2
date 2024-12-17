import style from "../../src/styles/TaskCard/TaskCard.module.css"
import { useRouter } from "next/router"

export default function TaskCard(props) {
    const router = useRouter();

    const handleClick = () => {
        router.push({
            pathname: '/',
            query: { description: props.description, output: props.output_data},
        });
    };

    return (
        <div className={style.taskCard} onClick={handleClick}>
            <h3>{props.name}</h3>
            <p>Дата создания: {props.date_create}</p>
        </div>
    );
}
