import React, { useEffect, useState } from 'react';
import io from "socket.io-client";

import logo from './logo.svg';
import './App.css';
import Cursor from './components/Cursor';
import useMousePosition from './hooks/useMousePosition';


let socket;


function App() {
  const [cursor, setCursor] = useState("")
  const [users, setUsers] = useState([])
  const position = useMousePosition()

  useEffect(() => {
    socket = io("http://localhost:3001", {});
    socket.on('test', d => {
      console.log(d)
    })
    socket.on('users', users => {
      console.log(users)
      setUsers(users)
    })

    fetch('https://picsum.photos/300/300?random=1').then(resp => {
      setCursor(resp.url)
      socket.emit("image", resp.url);
    }).catch(console.log)

  }, [])

  useEffect(() => {
    socket.emit("cursorPosition", JSON.stringify(position));
  }, [position])
  
  return (
    <div className="App">
      {/* My cursor */}
      <Cursor img={cursor} {...position} />
      {/* Others Cursors */}
      {users.map((user, i) => {
        return <Cursor key={ user.id} img={user.url} x={i * 100} y={i * 100} />
      })
      }
    </div>
  );
}

export default App;
