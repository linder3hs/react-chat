import { useState } from "react";
import { IUser } from "../../type";
import { userChannels } from "../../services/pusher";
import { ChatEmpty, ChatWindow, ListUsers } from "../../components";
import useUser from "../../hooks/useUser";

interface Props {
  user: IUser;
}

export default function Chat({ user }: Props) {
  const [currentReceiver, setCurrentReciever] = useState<IUser | null>(null);

  const { users, fetchUsers } = useUser(user);

  const handleCurrentReciever = (user: IUser) => {
    setCurrentReciever(user);
  };

  userChannels.bind("store-user", async function () {
    await fetchUsers();
  });

  return (
    <>
      <div className="bg-gray-900 h-[5vh] flex items-center justify-end">
        <h2 className="text-right px-5">{user.email}</h2>
      </div>
      <div className="flex h-[95vh]">
        <div className="border min-w-[350px]">
          <ListUsers
            users={users}
            handleCurrentReciever={handleCurrentReciever}
          />
        </div>
        <div className="border w-full flex flex-col justify-between">
          {!currentReceiver ? (
            <ChatEmpty />
          ) : (
            <ChatWindow currentReceiver={currentReceiver} />
          )}
        </div>
      </div>
    </>
  );
}
