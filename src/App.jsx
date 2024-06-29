import { useEffect } from "react";
import { useState } from "react";
import Card from "./components/Card";

function App() {
  const [users, setUsers] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    // console.log("calling useEffect");
    if (!users) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }
  }, []);

  const onCardClicked = (id) => {
    if (currentScore !== users.length) {
      if (selectedUsers.includes(id)) {
        setBestScore((prevScore) =>
          prevScore < currentScore ? currentScore : prevScore
        );
        setCurrentScore(0);
        setSelectedUsers([]);
      } else {
        const shuffledUsers = shuffleArray(users);
        setUsers(shuffledUsers);
        setSelectedUsers((prevUsers) => [...prevUsers, id]);
        setCurrentScore((prevScore) => prevScore + 1);
      }
    } else {
      setBestScore(currentScore);
      setCurrentScore(0);
      setSelectedUsers([]);
    }
  };

  return (
    <main>
      <p>CurrentScore: {currentScore}</p>
      <p>Best score: {bestScore}</p>
      <section className="row">
        {users?.map((user) => (
          <Card key={user.id} user={user} onCardClicked={onCardClicked} />
        ))}
      </section>
    </main>
  );
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default App;
