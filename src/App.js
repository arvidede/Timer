import React from 'react'
import { Clock, Timer } from './components/'
import { ClockIcon, TimerIcon } from './assets/icons/'
import './styles/App.css'

function App() {
    const [isTimer, setTimer] = React.useState(true)
    return (
        <div className="App">
            {isTimer ? <Timer /> : <Clock />}
            <span className='settings'>
                <button className={isTimer ? 'active' : ''} onClick={() => setTimer(true)}>
                    <TimerIcon />
                </button>
                <button className={isTimer ? '' : 'active'} onClick={() => setTimer(false)}>
                    <ClockIcon />
                </button>
            </span>
        </div>
    )
}

export default App
