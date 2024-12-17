import React, { useState,useEffect } from 'react';
import { Headers } from "../../components/Header/Headers";
import style from "../styles/Auth/Registration.module.css"; // Импортируем стили
import Link from 'next/link';
import {useRouter} from 'next/router';

function Registration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('isAuth') === 'true') {
      router.push("/dashBoard/")
  }
    }, []);
  // Состояния для полей формы
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // Состояние для ошибки
  const [loading, setLoading] = useState(false); // Состояние для загрузки
  const router = useRouter();

  // Обработчик изменения полей
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault(); // предотвращаем стандартную отправку формы

    // Простая валидация
    if (!name || !email || !password) {
      setError('Все поля должны быть заполнены'); // Устанавливаем ошибку
      return;
    }

    setLoading(true); // Начинаем загрузку

    try {
      const response = await fetch('http://127.0.0.1:8000/Login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password}), // Отправляем данные
      });

      if (response.ok) {
        // Успешная регистрация
        console.log('Вход успешен!');
        setName('');
        setEmail('');
        setPassword('');
        setError('');
        const dat = await response.json();
        if (typeof window !== 'undefined') {
          localStorage.setItem('isAdmin', dat.isAdmin);
          localStorage.setItem('isAuth', 'true');
        }
        router.push({
          pathname: '/dashBoard/',
          query: {isAdmin:dat.isAdmin, name:name},
      });
      } else {
        // Ошибка на сервере
        setError(data.error || 'Произошла ошибка при регистрации');
      }
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
            <Link className={style.header} href='Registration/'>
              <h1>Регистрация</h1>
            </Link>
            <Link className={style.header} style={{ textDecoration: 'underline' }} href='Login/'>
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
            <div>
              <div class="wrap">
                <button class="button">Войти</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
