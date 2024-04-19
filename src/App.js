// styles
import style from './App.module.scss';
// Components
import {Route, Routes, Link} from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import ApplicationForm from "./components/ApplicationForm/ApplicationForm";
import PivotTable from "./components/PivotTable/PivotTable";
// Data
import data from "./server/data.json";
//hooks
import {useState} from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  return (
    !isLoggedIn ? (
      <LoginForm onLogin={handleLogin}/>
    ) : (
      <div className={style.container}>
        <ul className={style.nav}>
          <li><Link to="/applicationForm">Форма для заявки</Link></li>
          <li><Link to="/table">Сводная таблица</Link></li>
        </ul>
        <Routes>
          <Route path="/applicationForm" element={<ApplicationForm constructors={data.constructors} request={data.app}/>}
          />
          <Route path="/table" element={<PivotTable requests={data.app} constructors={data.constructors}/>}/>
        </Routes>
      </div>
    )
  );
}

export default App;
