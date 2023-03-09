import { useEffect, useState } from "react";

const App = () => {

  const [usersData, setUsersData] = useState([]);
  
  useEffect(() => {
    const URL = 'https://test-infobasic-defauLt-rtdb.europe-west1.firebasedatabase.app/users.json';
    const OPTIONS = {
      method: 'GET',
    }
    fetch(URL, OPTIONS)
    .then(response => {
      response.json()
      .then(data => {
        const users = [];
        const keys = Object.keys(data)
        keys.forEach(() => {})
        console.log(data);
      })
    })
    .catch
  }, [])

  return <>
    <div className="container">
      <div className="row">
        <div className="col-6 p-5">
          <h3 className="pt-2">Aggiungi Utente</h3>
          <form>
            <div class="form-group pt-2">
              <label className="pb-2" for="nome">Nome</label>
              <input type="text" class="form-control" id="nome" placeholder="nome"/>
            </div>
            <div class="form-group py-2">
              <label className="pb-2" for="cognome">Cognome</label>
              <input type="text" class="form-control" id="cognome" placeholder="cognome"/>
            </div>
            <button type="submit" class="btn btn-primary">Aggiungi</button>
          </form>
        </div>
        
        <div className="col-6 p-5">
        <h3 className="pt-2">Utenti Registrati</h3>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Cognome</th>
                <th scope="col">Azioni</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>
                  <button type="submit" class="btn btn-danger">Modifica</button>
                  <button type="submit" class="btn btn-danger">Cancella</button>
                </td>
              </tr>
            </tbody>
          </table>          
        </div>
      </div>
    </div>
  </>;
}

export default App;