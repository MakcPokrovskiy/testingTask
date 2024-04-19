//styles
import style from './pivotTable.module.scss';


const PivotTable = ({requests, constructors}) => {

  const documentCounts = {};

  requests.forEach(request => {
    if (documentCounts[request.documentName]) {
      documentCounts[request.documentName]++;
    } else {
      documentCounts[request.documentName] = 1;
    }
  });

  requests.sort((a, b) => documentCounts[b.documentName] - documentCounts[a.documentName]);

  return (
    <div className={style.container}>
      <h2 className={style.title}>Сводная таблица</h2>
      <table>
        <thead>
        <tr>
          <th>ФИО конструктора</th>
          <th>Наименование документа</th>
          <th>Количество заявок</th>
        </tr>
        </thead>
        <tbody>
        {requests.map(request => {
            const constructor = constructors.find(constructor => constructor.id == request.constructorId);
            return (
              <tr key={request.id}>
                <td>{constructor ? constructor.name : "Неизвестный конструктор"}</td>
                <td>{request.documentName}</td>
                <td>{`${documentCounts[request.documentName]}: Заявка(и) с таким документом`}</td>
              </tr>
            )
          }
        )}
        </tbody>
      </table>
    </div>
  );
}

export default PivotTable;