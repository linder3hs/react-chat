import { useState, useEffect } from "react";
import { Chat, Register } from "./components";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) return;

    setUser(JSON.parse(user));
  }, []);

  return (
    <div >{!user ? <Register /> : <Chat user={user} />}</div>
  );
}
