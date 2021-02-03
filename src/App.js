import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  //URL VARIABLE
  const url = "http://localhost:3000"
  // LIST OF ICECREAM
  const [icecream, setIcecreams] = React.useState([])
  // EMPTY ICECREAM
  const emptyIcecream = {
    name: "",
    flavor: "",
    readyToEat: null
  }

  // STATE TO TRACK ICECREAM TO EDIT
  const [selectedIcecream, setSelectedIcecream] = React.useState
  (emptyIcecream);
  
  // LIST OF ICECREAMS
  const getIcecreams = () => {
    fetch(url + "/icecream")
    .then(response => response.json())
    .then(data => {
      setIcecreams(data)
    })
  }

  // FETCH ICECREAM WHEN PAGE LOADS
  React.useState(() => {
    getIcecreams()
  }, [])

  // HANDLECREATE FUNCTION FOR CREATING ICECREAM
  const handleCreate = (newIcecream) => {
    fetch(url + "/icecream", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newIcecream)
    })
    .then(() => {
      getIcecreams()
    })
  }

  const selectIcecream = (icecream) => {
    setSelectedIcecream(icecream)
  }

  // FUNCTION FOR WHEN ICECREAM IS UPDATED
  const handleUpdate = (icecream) => {
    fetch(url + "/icecream/" + icecream._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(icecream)
    })
    .then(() => {
      getIcecreams()
    })
  }

  // DELETE A ICECREAM
  const deleteIcecream = (icecream) => {
    fetch(url + "/icecream/" + icecream._id, {
      method: "delete"
    })
    .then(() => {
      getIcecreams()
    })
  }

  return (
    <div className="App">
      <h1>Ice Cream Listings!</h1>
      <Link to="/create">
      <button className="btn1">Create a Ice Cream</button>
      </Link>
      <hr />
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => <Display {...rp} icecreams={icecreams} selectIcecream={selectIcecream} deleteIcecream={deleteIcecream}/>} />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" icecream={emptyIcecream} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" icecream={selectedIcecream} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
