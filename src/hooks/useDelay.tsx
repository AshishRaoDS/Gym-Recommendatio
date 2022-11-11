import Preact from "preact"
import { useEffect, useState } from "preact/hooks"
import { Position } from "./usePointer"



const useDelay = (position: Position, delayTime: number) => {
    const [delay, setDelay] = useState(position)

    useEffect(() => {
        setTimeout(() => {
            setDelay(position)
        }, delayTime)
    }, [position, delayTime])

    return delay
}

export default useDelay;