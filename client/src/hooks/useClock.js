import {useState, useEffect} from 'react'

export const useClock = () => {                             // exporting logic from Clock.js for rendering performances
    const [clock, setClock] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        let id = setInterval(() => {                        // only at component mounting, and not at each rendering
            setClock(new Date().toLocaleTimeString())
        }, 1000);

        return () => clearInterval(id);                     // clear interval at component unmounting
    }, []);

  return clock;
}
