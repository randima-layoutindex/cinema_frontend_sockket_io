
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io.connect("http://localhost:3001");

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState();
  const [seat,setSeat] = useState()

  const [likes, setLikes] = useState();

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(()=>{
socket.emit("findAllMessages",{},(response)=>{
  setSeat(response)
})
// socket.on("recieve_message", (data) => {
//   // console.log(data)
//   // console.log(data.length)
//   setSeat(data)
//   // setMessageReceived(data.message);
//   // console.log(messageReceived.length)
// });
  },[])

  useEffect(()=>{
    socket.on("allSeats",(response)=>{
      setSeat(response)
    })
  })

  // useEffect(() => {
  //   socket.on("recieve_message", (data) => {
  //     // console.log(data)
  //     // console.log(data.length)
  //     setSeat(data)
  //     // setMessageReceived(data.message);
  //     // console.log(messageReceived.length)
  //   });

  //   // socket.on("likeupdate", (count) => {
  //   //   setLikes(count);
  //   // });
  // }, [socket,seat]);

  const seatOnHold = (id) =>{
    console.log(id,seat[id-1])
    // if(seat[id].onHold){
    //   setSeat([...seat,seat[id].onHold = false])
    // }
    let values = {id:id,onHold:seat[id-1].onHold = !seat[id-1].onHold }
    console.log(values)
    socket.emit("findOneMessage",values,(response)=>{
      console.log(response)
      setSeat(response)
      console.log("after update response",response)
    })
  }

  const updateClick = () => {
    socket.emit("liked");

    socket.on("likeupdate", (count) => {
      setLikes(count);
    });
  };

  return (
    <>

      <main className={`${styles.main} ${inter.className}`}>
        {seat && console.log(seat.length)}
        {
          seat && seat.map((item,index)=>{
            return <div key={index} onClick={()=>seatOnHold(item.id)} style={item.onHold ? {background:"green"}:{background:'red'}}>
              <h2>{item.id}</h2>
            </div>
          })
        }
      {/* <button onClick={updateClick}> click</button>
       <h1>{likes}</h1> */}
        {/* <div className="App">
          <input
            placeholder="Room Number..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}> Join Room</button>
          <input
            placeholder="Message..."
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <button onClick={sendMessage}> Send Message</button>
          <h1> Message:</h1>
          {messageReceived}
        </div>  */}
      </main>
    </>
  )
}
