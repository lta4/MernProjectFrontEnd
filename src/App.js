import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  //URL VARIABLE
  const url = "https://mernprojectbackend.herokuapp.com"
  // LIST OF ICECREAM
  const [icecreams, setIcecreams] = React.useState([])
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
      <div className="picks">
        <h2 className="desire">Scrumcious Desire
          <p className="descriptions">"Served with rasberries, almonds and delectable cherries with a dark chocolate sauce"</p>
        </h2>
        <h2 className="days">Summer Days
        <p className="descriptions">"Served with fresh strawberries, kiwi slices and summer blueberries with a rasberry sauce"</p>
        </h2>
        <h2 className="bland">Great n Bland
        <p className="descriptions">"Served with bannanas, sea salt with a caramel sauce"</p>
        </h2>
      </div>
      <div>
        <h2>Flavors:</h2>
        <p className="flavors">Chocolate</p>
        <p className="flavors">Strawberry</p>
        <p className="flavors">Vanilla</p>
      </div>
      <hr />
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => <Display {...rp} icecreams={icecreams} selectIcecreams={selectIcecream} deleteIcecreams={deleteIcecream}/>} />
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
