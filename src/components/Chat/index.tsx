import { IUser } from "../../type";

interface Props {
  user: IUser;
}

export default function Chat({ user }: Props) {
  return (
    <div>
      <div className="bg-gray-900 h-[5vh] flex items-center justify-end">
        <h2 className="text-right px-5">{user.email}</h2>
      </div>
      <div className="flex h-[95vh]">
        <div className="border min-w-[350px]">
          <div className="p-6">Lista de usuarios</div>
        </div>
        <div className="border w-full flex flex-col justify-between">
          <div className="h-[85vh] border"></div>
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
        </div>
      </div>
    </div>
  );
}
