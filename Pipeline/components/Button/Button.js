import style from "@/styles/Button/Button.module.css"

const Button = ({children, ...props}) => {
    return(
        <button onClick={props.onClick} className={style.button + " " + props.className}>{children}</button>
    )
}

export default Button;