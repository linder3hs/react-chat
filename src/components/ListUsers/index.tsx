import { IUser } from "../../type";

interface Props {
  users: IUser[];
  handleCurrentReciever: (user: IUser) => void;
}

export default function ListUsers({ users, handleCurrentReciever }: Props) {
  return (
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
  );
}
