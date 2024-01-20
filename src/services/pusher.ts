import Pusher from "pusher-js";

const pusher = new Pusher("1b1ab7b5ab28cae45fd8", {
  cluster: "us2",
});

export const userChannels = pusher.subscribe("user-channels");
export const chatChannels = pusher.subscribe("chat-channels");

export default pusher;
