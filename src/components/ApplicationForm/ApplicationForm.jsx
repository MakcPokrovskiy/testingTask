//styles
import style from './applicationForm.module.scss';
//hooks
import {useState} from "react";

const ApplicationForm = ({constructors , request}) => {
  const [constructorId, setConstructorId] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!constructorId || !documentName) {
      setError('Пожалуйста, заполните все поля формы');
      return;
    }

    const isDuplicate = request.some(request => request.constructorId === constructorId && request.documentName === documentName);
    if (isDuplicate) {
      setError('Заявка с таким наименованием документа уже существует для выбранного конструктора');
      return;
    }

    const formData = {
      constructorId,
      documentName
    };

    fetch('http://localhost:3001/app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при отправке данных на сервер');
        }
        setConstructorId('');
        setDocumentName('');
        setError('');
        console.log('Данные отправились на сервер');
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setError('Ошибка при отправке данных на сервер');
      });
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Форма для заявки</h2>
      <form className={style.formWrapper} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="constructor">ФИО конструктора:</label>
          <select id="constructor" value={constructorId} onChange={(e) => setConstructorId(e.target.value)}>
            <option value="">Выберите конструктора</option>
            {constructors.map(constructor => (
              <option key={constructor.id} value={constructor.id}>{constructor.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="documentName">Наименование документа:</label>
          <input
            type="text"
            id="documentName"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            required
          />
        </div>
        <button className={style.formBtn} type="submit">Отправить заявку</button>
      </form>
    </div>
  );
}

export default ApplicationForm;