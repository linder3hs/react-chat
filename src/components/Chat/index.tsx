import { useState, useEffect } from "react";
import { IUser } from "../../type";
import { get } from "../../services";
import { userChannels } from "../../services/pusher";

interface Props {
  user: IUser;
}

export default function Chat({ user }: Props) {
  const [users, setUsers] = useState<IUser[]>([]);

  const [currentReceiver, setCurrentReciever] = useState<IUser | null>(null);

  const fetchUsers = async () => {
    const response = await get<IUser[]>({ url: `/users/${user.id}` });
    setUsers(response.data);
  };

  const handleCurrentReciever = (user: IUser) => {
    setCurrentReciever(user);
  };

  userChannels.bind("store-user", async function () {
    await fetchUsers();
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="bg-gray-900 h-[5vh] flex items-center justify-end">
        <h2 className="text-right px-5">{user.email}</h2>
      </div>
      <div className="flex h-[95vh]">
        <div className="border min-w-[350px]">
          <div className="p-6">
            {users.length > 0 ? (
              <div className="flex flex-col gap-5">
                {users.map((user) => (
                  <div
                    className="card bg-gray-900 p-3 shadow-xl cursor-pointer"
                    onClick={() => handleCurrentReciever(user)}
                  >
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No hay usuarios registrados</p>
            )}
          </div>
        </div>
        <div className="border w-full flex flex-col justify-between">
          {!currentReceiver ? (
            <>
              <h2>Da click en un chat Para comenzar</h2>
            </>
          ) : (
            <>
              <div className="h-[85vh] border">
                <div>{currentReceiver.email}</div>
              </div>
              <div className="h-[10vh]">
                <form action="" className="p-6 flex gap-5">
                  <input
                    type="text"
                    placeholder="Escribe tu mensaje..."
                    className="input input-bordered w-full"
                  />
                  <button type="submit" className="btn btn-secondary">
                    Enviar
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
