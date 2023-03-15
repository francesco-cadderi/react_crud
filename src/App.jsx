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

  //al caricamento della pagina prende i dati dal server
  useEffect(() => {
    const OPTIONS = {
      method: 'GET',
    }
    fetch(URL, OPTIONS)
    .then(response => {
      response.json()
      .then(data => {
        //salva nell'array users gli oggetti definendo per ognuno di loro un id univoco 
        const users = [];
        Object.keys(data).forEach(key => users.push({...data[key], id: key}))
          setUsersData(users)
          console.log(data)
      })
    })
    .catch(console.log("errore"))
  }, [])

  //gestisco bottone dell'aggiunta utente
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
    .then(()=>{
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
            console.log(data)
        })
      })
    })
    .catch(console.log("errore"))
  }

  //gestisco bottone della cancellazione utente
  const buttonDeleterHandler = (id) => {

    const REQUEST_DELETE = {
      method: 'DELETE',
      headers: {
        "content-type":"application/json"
      }
    };
    fetch('https://test-infobasic-defauLt-rtdb.europe-west1.firebasedatabase.app/users/' + id + '.json', REQUEST_DELETE)
    
    //riaggiorno il dato dopo la cancellazione
    .then(()=>{
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
            console.log(data)
        })
      })  
    })
    .catch(console.log("errore"))
  }

  /* non è che per caso devi fare un nuovo return per creare un form exnovo? avrebbe senso
  soprattutto perché i value sono già occupati e poi devi fare i pulsanti nuovi
  
  enteredUserName dovrebbe andare a sostituirsi
  */

  const buttonModifyHandler = (id) => {

  const OPTIONS = {
    method: 'GET',
  }

  fetch(URL, OPTIONS)
  .then(response => {
    response.json()
      .then(data => {
        const users = [];
        Object.keys(data).forEach(key => users.push({...data[key], id: key}))
          /* setEnteredUsername(users.key.userName)
          setEnteredEmail(users.key.userEmail) */
          //poi prova il .find sull'array
          (console.log(data))
      })
  })
  .catch(console.log("errore"))
  }

  return <>
    <div className="container">
      <div className="row">
        <div className="col-6 p-5">
          <h3 className="pt-2">Aggiungi Utente</h3>
          <form onSubmit={formSubmissionHandler}>
            <div className="form-group pt-2">
              <label className="pb-2" htmlFor="nome">Nome</label>
              <input onChange={usernameInputChangeHandler} value={enteredUsername} type="text" className="form-control" id="nome" placeholder="nome"/>
            </div>
            <div className="form-group py-2">
              <label className="pb-2" htmlFor="email">Email</label>
              <input onChange={emailInputChangeHandler} value={enteredEmail} type="text" className="form-control" id="email" placeholder="email"/>
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
                        <button type="submit" className="btn btn-warning me-2" onClick={() => buttonModifyHandler(value.id)}>Modifica</button>
                        <button type="submit" className="btn btn-danger" onClick={() => buttonDeleterHandler(value.id)}>Cancella</button>
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