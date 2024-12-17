import { useState } from "react";
import style from "../../src/styles/MenuInput/MenuInput.module.css";
import Button from "../Button/Button";

const MenuInput = ({ handleSubmit, code, setCode }) => {
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState(""); 

    const handleSaveFile = () => {
        if (!fileName) {
            alert("Пожалуйста, введите имя файла!");
            return;
        }

        setLoading(true);

        const blob = new Blob([code], { type: "text/plain;charset=utf-8" });

        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);

        link.download = fileName.endsWith(".py") ? fileName : `${fileName}.py`;

        link.click();

        setLoading(false);
    };

    const handleDeleteContent = () => {
        setCode("");
    };

    return (
        <div className={style.menu_item__block}>
            <div className={style.line__block}>
                <input
                    className={style.name__input}
                    placeholder="Введите имя файла"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                />
                <select className={style.menu_item__selected}>
                    <option>Python 3.8</option>
                </select>
            </div>
            <div className={style.line__block}>
                <Button
                    className={style.service__buttons}
                    id="execute"
                    onClick={() => handleSubmit(code)}
                >
                    Выполнить
                </Button>
                <Button
                    className={style.service__buttons}
                    id="save"
                    onClick={handleSaveFile}
                    disabled={loading}
                >
                    {loading ? "Сохраняем..." : "Сохранить"}
                </Button>
                <Button
                    className={style.service__buttons}
                    id="reset"
                    onClick={handleDeleteContent}
                >
                    Удалить
                </Button>
            </div>
        </div>
    );
};

export default MenuInput;
