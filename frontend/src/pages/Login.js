import React, { useState } from "react";

import api from "../services/api";
import "./Login.css";

import logo from "../assets/logo.png";
import brand from "../assets/brand.png";
import { Link } from "react-router-dom";

export default function Login({ history }) {
  const [username, setUsername] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post("/lol", {
      username
    });

    if (username !== undefined) {
      const { _id } = response.data;

      console.log(response);

      history.push(`/lol/${_id}`);
    }


  }

  return (
    < div className="center" >
      <Link to="/">
        <div className="row col-md h-25 p-3">
          <img src={logo} alt="logo" id="llogo" className="logos"></img>
        </div>
        <div className="row col-md h-25 p-3">
          <img src={brand} alt="brand" id="brand" className="logos"></img>
        </div>
      </Link>

      <form onSubmit={handleSubmit} id="formulario" className="row col">
        <div className="input-group row h-50 p-3">
          <div className="input-group-prepend col">
            <input
              type="text"
              className="form-control"
              placeholder="Digite su nombre de invocador de LOL"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            &nbsp;
            <div >
              <button type="submit button" className="btn btn-success">
                Buscar
            </button>
            </div>
          </div>
        </div>
      </form>
    </div >
  );
}
