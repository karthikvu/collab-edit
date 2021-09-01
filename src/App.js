import React, { useEffect, useState } from 'react';
import io from "socket.io-client";

import logo from './logo.svg';
import './App.css';
import Cursor from './components/Cursor';
import useMousePosition from './hooks/useMousePosition';
import { throttle } from './utils'

let socket;

const throttledEmit = throttle((position) => {
  if (!socket) return;
  socket.emit("cursorPosition", JSON.stringify(position));
}, 100)

const byId = arr => {
  return arr.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});
}

function App() {
  const [myId, setMyId] = useState('')
  const [cursor, setCursor] = useState("")
  const [users, setUsers] = useState({})
  const position = useMousePosition()

  useEffect(() => {
    socket = io("http://localhost:3001", {});
    socket.on('_connect', function (d) {
      setMyId(d)
    });
    
    socket.on('cursorPosition', d => {
      setUsers({
        ...users,
        [d.id]:d
      })
    })

    socket.on('users', users => {
      setUsers(byId(users))
    })

    fetch('https://picsum.photos/300/300?random=1').then(resp => {
      setCursor(resp.url)
      socket.emit("image", resp.url);
    }).catch(console.log)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    throttledEmit(position)
  }, [position])
  console.log(`users: `,users)
  
  return (
    <div className="App">
      {/* My cursor */}
      <Cursor img={cursor} name={ myId} {...position} />
      {/* Others Cursors */}
      {Object.values(users).map((user, i) => {
        return <Cursor key={user.id} name={user.id } {...user} img={user.url} />
      })
      }
    </div>
  );
}

export default App;
