import { useState, useEffect } from "react";
import { Chat, Register } from "./components";
import { IUser } from "./type";

export default function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) return;

    setUser(JSON.parse(user));
  }, []);

  return (
    <div>{!user ? <Register setUser={setUser} /> : <Chat user={user} />}</div>
  );
}
