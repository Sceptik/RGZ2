import React, { useState } from 'react';
import { Headers } from "../../components/Header/Headers";
import style from "../styles/Auth/Registration.module.css"; // Импортируем стили
import Link from 'next/link';

function Registration() {
  // Состояния для полей формы
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // Состояние для ошибки
  const [loading, setLoading] = useState(false); // Состояние загрузки
  const [isAdmin, setIsAdmin] = useState(false);


  // Обработчик изменения полей
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);



  const handleCheckboxChange = () => {
    setIsAdmin(!isAdmin);
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault(); // предотвращаем стандартную отправку формы

  
    // Простая валидация
    if (!name || !email || !password) {
      setError('Все поля должны быть заполнены');
      return;
    }

    setLoading(true); // Устанавливаем состояние загрузки

    try {
      const response = await fetch('http://127.0.0.1:8000/Registration/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, isAdmin}), // Отправляем данные
      });

      const data = await response.json();

      if (response.ok) {
        // Успешная регистрация
        console.log('Регистрация успешна!', data);
        setName('');
        setEmail('');
        setPassword('');
        setError('');
      } else {
        // Ошибка на сервере
        setError(data.error || 'Произошла ошибка при регистрации');
      }
    } catch (error) {
      setError('Ошибка сети или сервера');
    } finally {
      setLoading(false); // Завершаем состояние загрузки
    }
  };

  return (
    <div className="backround__item">
      <Headers exit = {false}/>
      <div className={style.container} style={{ marginTop: "8%" }}>
        <div className={style.registrationForm}>
          <div className={style.header}>
            <Link className={style.header} style={{ textDecoration: 'underline' }} href='Registration/'>
              <h1>Регистрация</h1>
            </Link>
            <Link className={style.header} href='Login/'>
              <h1>Вход</h1>
            </Link>
          </div>

          {error && <p className={style.error}>{error}</p>} {/* Показываем ошибку, если есть */}

          <form onSubmit={handleSubmit}>
            <div className={style.inputGroup}>
              <label htmlFor="name">Имя:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                required
                className={style.input}
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="email">Электронная почта:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
                className={style.input}
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className={style.input}
              />
            </div>

              <div className={style.inputGroup}>
              <label htmlFor="isAdmin"> 
                <input

                  type="checkbox"
                  checked={isAdmin} 
                  onChange={handleCheckboxChange} 
                />
                Админ
              </label>
              </div>
            <div>
            <div class="wrap">
              <button class="button">Зарегестрироваться</button>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
