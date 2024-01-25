import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { IUser, IMessage } from "../../type";
import { post, get } from "../../services";
import { chatChannels } from "../../services/pusher";

interface Props {
  currentReceiver: IUser;
  user: IUser;
}

export default function ChatWindow({ currentReceiver, user }: Props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  const handleFetchMessages = async () => {
    const response = await get<IMessage[]>({
      url: `/chat/${user.id}/${currentReceiver.id}`,
    });

    setMessages(response.data);
  };

  chatChannels.bind("store-chat", async () => {
    await handleFetchMessages();
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      text: message,
      transmitterUserId: user.id,
      receiverUserId: currentReceiver.id,
    };

    await post({
      url: "/chat/create",
      body: data,
    });

    setMessage("");

    await handleFetchMessages();
  };

  useEffect(() => {
    handleFetchMessages();
  }, [currentReceiver]);

  return (
    <>
      <div className="h-[85vh] border">
        <div className="py-4 text-right px-5">{currentReceiver.email}</div>
        <hr />
        {messages.length > 0 &&
          messages.map((msg) => (
            <div key={msg.id}>
              <div className="bg-gray-900 px-10 py-5 mb-5">{msg.text}</div>
            </div>
          ))}
      </div>
      <div className="h-[10vh]">
        <form className="p-6 flex gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            value={message}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
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
