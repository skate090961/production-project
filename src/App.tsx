import {useState} from "react";

export function App() {
    const [counter, setCounter] = useState(0)

    return (
        <div>
            <h1>{`Counter123: ${counter}`}</h1>
            <button onClick={() => setCounter(prev => prev + 1)}>inc</button>
        </div>
    );
}
