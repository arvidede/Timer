import React, { useState } from 'react'
import { useInterval, MS_PER_SECOND } from '../assets/js/'
import '../styles/Clock.css'

export const Clock = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString())
    useInterval(() => setTime(new Date().toLocaleTimeString()), MS_PER_SECOND)
    return <div className="clock">{time}</div>
}
