import { IUser } from "../../type";

interface Props {
  currentReceiver: IUser;
}

export default function ChatWindow({ currentReceiver }: Props) {
  return (
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
  );
}
