import React, { useState } from 'react'
import { useInterval, MS_PER_MINUTE, MS_PER_SECOND, TIME } from '../assets/js/'
import { Play, Pause } from '../assets/icons/'
import '../styles/Timer.css'

const INIT_TIME = 20 * MS_PER_MINUTE
const INIT_INPUT = '20:00'

export const Timer = () => {
    const [isRunning, setIsRunning] = useState(false)
    const [time, setTime] = useState(INIT_TIME)
    const [input, setInput] = useState(INIT_INPUT)

    const handleTimeChange = () => {
        const hhmmss = input.split(':')
        let index = TIME.length - hhmmss.length
        const newTime = hhmmss
            .map(val => Number(val) * TIME[index++])
            .reduce((a, b) => a + b)
        setTime(newTime)
    }

    const handleStartTimer = () => {
        if (isRunning) setInput(parseTime(time))
        setIsRunning(!isRunning)
    }

    useInterval(
        () => {
            if(time - MS_PER_SECOND === 0) setIsRunning(false)
            setTime(time - MS_PER_SECOND)
        },
        isRunning ? MS_PER_SECOND : null
    )

    const parseTime = time => {
        const d = new Date(time)
        const hh = d.getUTCHours()
        const mm = d.getUTCMinutes()
        const ss = d.getSeconds()

        return [hh, mm, ss]
            .map((t, i) =>
                t !== 0 ? (t < 10 ? '0' + t : t) : i === 2 ? '00' : t
            )
            .filter(t => t)
            .join(':')
    }

    return (
        <div className="timer">
            <input
                autoFocus
                type="text"
                value={isRunning ? parseTime(time) : input}
                onChange={e => setInput(e.target.value)}
                onFocus={() => setIsRunning(false)}
                onBlur={handleTimeChange}
            />
            <span>
                <button onClick={handleStartTimer}>
                    {isRunning ? <Pause /> : <Play />}
                </button>
            </span>
        </div>
    )
}
