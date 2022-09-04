import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import Player from "../../components/Player";
import firebaseDB from "../../config/firebaseDB";
import { useSelector } from "react-redux";
import { doc, updateDoc, where, getDocs, query, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import Authenticated from "../../middlewares/Authenticated";
import styles from "../../styles/Game.module.css";
import { Table } from "react-bootstrap";

function Game() {
  const weapons = ["rock", "paper", "scissors"];
  const [playerOne, setPlayerOne] = useState(weapons[0]);
  const [playerTwo, setPlayerTwo] = useState(weapons[0]);
  const [winner, setWinner] = useState("");
  const [uid, setUid] = useState("");
  const [scoreFromDoc, setScoreFromDoc] = useState(0);
  const [score, setScore] = useState(0);
  const [players, setPlayers] = useState([]);
  const { displayNameName } = players;
  const authenticatedUser = useSelector((state) => state.auth.authenticatedUser);

  console.log("aku adalah authenticated user:", authenticatedUser);

  const getQuery = async () => {
    const q = query(collection(firebaseDB, "users"), where("uid", "==", authenticatedUser.uid));
    const querySnapshot = await getDocs(q);
    const res = querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data().score);
      setUid(doc.id);
      setScoreFromDoc(doc.data().score);
    });
  };

  return (
    <Authenticated>
      <Navbar />
     
      <div className="container">
        <h1 className="text-center">Leaderboard</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.displayName}</td>
                <td>{item.email}</td>
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Authenticated>
  );
}

export default Game;
