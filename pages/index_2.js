
// import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
// import io from "socket.io-client";
// import { useState, useEffect } from "react";

// const socket = io.connect("http://localhost:3001");

// const inter = Inter({ subsets: ['latin'] })

// export default function Home() {
//   const [room, setRoom] = useState("");

//   const [message, setMessage] = useState("");
//   const [messageReceived, setMessageReceived] = useState("");

//   const joinRoom = () => {
//     if (room !== "") {
//       socket.emit("join_room", room);
//     }
//   };

//   const sendMessage = () => {
//     socket.emit("send_message", { message, room });
//   };

//   useEffect(() => {
//     socket.on("recieve_message", (data) => {
//       setMessageReceived(data.message);
//     });

//   }, [socket]);


//   return (
//     <>

//       <main className={`${styles.main} ${inter.className}`}>
//         <div className="App">
//           <input
//             placeholder="Room Number..."
//             onChange={(event) => {
//               setRoom(event.target.value);
//             }}
//           />
//           <button onClick={joinRoom}> Join Room</button>
//           <input
//             placeholder="Message..."
//             onChange={(event) => {
//               setMessage(event.target.value);
//             }}
//           />
//           <button onClick={sendMessage}> Send Message</button>
//           <h1> Message:</h1>
//           {messageReceived}
//         </div>
//       </main>
//     </>
//   )
// }
