import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "./Main.css";

import logo from "../assets/LogoMain.png";
import like from "../assets/Like.png";
import nlike from "../assets/Nlike.png";


export default function ({ match }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/lol", {
        headers: {
          user: match.params.id
        }
      });
      setUsers(response.data);
    }

    loadUsers();
  }, [match.params.id]);

  async function handleLike(id) {

    await api.post(`/lol/${id}/likes`, null, {
      headers: { user: match.params.id }
    })

    setUsers(users.filter(user => user._id !== id));

  }
  async function handleDisLike(id) {
    await api.post(`/lol/${id}/dislikes`, null, {
      headers: { user: match.params.id }
    })

    setUsers(users.filter(user => user._id !== id));
  }

  console.log(users[0]);




  return (
    <div className="center">
      <Link to='/'>
        {<img src={logo} alt="Logo" id="mlogo" />}
      </Link>
      {users.length > 0 ? (
        <ul className="list-group">
          {users.map(user => (
            <li key={user._id}>
              {<img src="data:image/jpeg;base64,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" alt="plogo" id="plogo" />}
              <footer>
                <strong>{user.user}</strong>
                <p>
                  Tier: {user.tier}
                </p>
                <p>
                  Rank: {user.rank}
                </p>
                <p>
                  Vitorias: {user.wins}
                </p>
                <p>
                  Derrotas: {user.losses}
                </p>
                <p>
                  League Points: {user.leaguePoints}
                </p>

              </footer>
              <div className="buttons">
                <button
                  type="button"
                  onClick={() => handleLike(user._id)}>
                  <img src={like} alt="like" className="button" id="btlike" />
                </button>

                <button
                  className="bdlike"
                  type="button"
                  onClick={() => handleDisLike(user._id)}
                >
                  <img src={nlike} alt="nlike" className="button" />{" "}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
          <div className="empty">No hay jugadores disponibles, intente mas tarde</div>
        )}
    </div>
  )
}
