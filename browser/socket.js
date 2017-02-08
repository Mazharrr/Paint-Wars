const socket = io('/')
import listeners from './listeners'


export const initializeSocket = () =>{
  // console.log('I have connected to the server');
	socket.on('connect', () => {
    listeners(socket)

  });
}

export default socket;
