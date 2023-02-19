import React, {useState, useEffect} from 'react'

const Clock = () => {
    const [clock, setClock] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        let id = setInterval(() => {                        // only at component mounting, and not at each rendering
            setClock(new Date().toLocaleTimeString())
        }, 1000);

        return () => clearInterval(id);                     // clear interval at component unmounting
    }, []);

  return (
    <h1>{clock}</h1>
  )
}

export default Clock