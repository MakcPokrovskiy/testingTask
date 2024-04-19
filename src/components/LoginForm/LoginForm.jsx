//styles
import style from './loginForm.module.scss';
//hooks
import { useState } from 'react';
import { redirect } from 'react-router-dom';


const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    fetch('http://localhost:3001/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при получении данных пользователя');
        }
        return response.json();
      })
      .then(users => {
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
          onLogin(username);
          setIsLoggedIn(true);
        } else {
          setError('Неправильное Login или Password');
        }
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setError('Ошибка при входе');
      });
  };


  if (isLoggedIn) {
    return <redirect to="/applicationForm"/>;
  }

  return (
    <div className={style.container}>
      <div>
        <h2 className={style.title}>Авторизация</h2>
        <input
          className={style.formName}
          type="text"
          placeholder="Login"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          className={style.formPas}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button
          className={style.formBtn}
          onClick={handleLogin}
        >Войти
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  );
};

export default LoginForm;
