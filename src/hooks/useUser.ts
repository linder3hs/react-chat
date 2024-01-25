import { useState, useEffect } from "react";
import { IUser } from "../type";
import { get } from "../services";

export default function useUser(user: IUser) {
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = async () => {
    const response = await get<IUser[]>({ url: `/users/${user.id}` });
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    fetchUsers,
  };
}
