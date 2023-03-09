import { useEffect, useState } from "react";

const App = () => {

  const [usersData, setUsersData] = useState([]);

  const URL = 'https://test-infobasic-defauLt-rtdb.europe-west1.firebasedatabase.app/users.json';

  const [enteredUsername, setEnteredUsername] = useState("");
  const usernameInputChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const [enteredEmail, setEnteredEmail] = useState("");
  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  useEffect(() => {
    const OPTIONS = {
      method: 'GET',
    }
    fetch(URL, OPTIONS)
    .then(response => {
      response.json()
      .then(data => {
        const users = [];
        Object.keys(data).forEach(key => users.push({...data[key], id: key}))
          setUsersData(users)
      })
    })
    .catch
  }, [])

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    const user2Obj = {
      userName: enteredUsername.trim(),
      userEmail: enteredEmail.trim()
    }

    const REQUEST_ADD = {
      method: 'POST',
      body: JSON.stringify(user2Obj),
      headers: {
        "content-type":"application/json"
      }
    };
    fetch(URL, REQUEST_ADD)
    .then((response)=>{
      console.log(response);
    })
    .catch((error)=>{
      console.error(error);
    })
  }

  return <>
    <div className="container">
      <div className="row">
        <div className="col-6 p-5">
          <h3 className="pt-2">Aggiungi Utente</h3>
          <form onSubmit={formSubmissionHandler}>
            <div className="form-group pt-2">
              <label className="pb-2" htmlFor="nome">Nome</label>
              <input onChange={usernameInputChangeHandler} type="text" className="form-control" id="nome" placeholder="nome" value={enteredUsername}/>
            </div>
            <div className="form-group py-2">
              <label className="pb-2" htmlFor="email">Email</label>
              <input onChange={emailInputChangeHandler} type="text" className="form-control" id="email" placeholder="email" value={enteredEmail}/>
            </div>
            <button type="submit" className="btn btn-primary">Aggiungi</button>
          </form>
        </div>
        
        <div className="col-6 p-5">
        <h3 className="pt-2">Utenti Registrati</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Email</th>
                <th scope="col">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {
                usersData.map((value)=>{
                  return (
                    <tr>
                      <td>{value.userName}</td>
                      <td>{value.userEmail}</td>
                      <td>
                        <button type="submit" className="btn btn-warning me-2">Modifica</button>
                        <button type="submit" className="btn btn-danger">Cancella</button>
                      </td>
                    </tr> 
                  )
                })
              }
            </tbody>
          </table>          
        </div>
      </div>
    </div>
  </>;
}

export default App;