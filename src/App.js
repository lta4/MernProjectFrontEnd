import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  const url = "https://mernprojectbackend.herokuapp.com"
  const [icecreams, setIcecreams] = React.useState([])
  const [shops, setShops] = React.useState([])
  const emptyIcecream = {
    name: "",
    flavor: "",
    readyToEat: null
  }
  const emptyShop = {
    name: "",
    yearBuilt: 0
  }
  const [selectedIcecream, setSelectedIcecream] = React.useState
  (emptyIcecream);

  const [selectedShop, setSelectedShop] = React.useState
  (emptyShop);

  
  const getIcecreams = () => {
    fetch(url + "/icecream")
    .then(response => response.json())
    .then(data => {
      setIcecreams(data)
    })
  }
  const getShops = () => {
    fetch(url + "/shop")
    .then(response => response.json())
    .then(data => {
      setShops(data)
    })
  }

  React.useState(() => {
    getIcecreams()
  }, [])
  React.useState(() => {
    getShops()
  }, [])

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
  const handleCreate2 = (newShop) => {
    fetch(url + "/shop", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(() => {
      getShops()
    })
  }

  const selectIcecream = (icecream) => {
    setSelectedIcecream(icecream)
  }
  const selectShop = (shop) => {
    setSelectedShop(shop)
  }

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
  const handleUpdate2 = (shop) => {
    fetch(url + "/shop/" + shop._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(shop)
    })
    .then(() => {
      getShops()
    })
  }

  const deleteIcecream = (icecream) => {
    fetch(url + "/icecream/" + icecream._id, {
      method: "delete"
    })
    .then(() => {
      getIcecreams()
    })
  }
  const deleteShop = (shop) => {
    fetch(url + "/shop/" + shop._id, {
      method: "delete"
    })
    .then(() => {
      getShops()
    })
  }

  return (
    <div className="App">
      <h1>Ice Cream Listings!</h1>
      <Link to="">
        <button className="btn2">Find a Shop</button>
      </Link>
      <Link to="/create">
      <button className="btn1">Create a Ice Cream</button>
      </Link>
      <hr />
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => <Display {...rp} icecreams={icecreams} selectIcecreams={selectIcecream} deleteIcecreams={deleteIcecream}/>} />

          <Route exact path="/" render={(rp) => <Display {...rp} shops={shops} selectShops={selectShop} deleteShops={deleteShop}/>} />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" icecream={emptyIcecream} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" shops={emptyShop} handleSubmit={handleCreate2} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" icecream={selectedIcecream} handleSubmit={handleUpdate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" shop={selectedShop} handleSubmit={handleUpdate2} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
