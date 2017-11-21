const socket = io("/");
import listeners from "./listeners";

export const initializeSocket = () => {
  socket.on("connect", () => {
    listeners(socket);
  });
};

export default socket;
