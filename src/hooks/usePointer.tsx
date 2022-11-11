import { useEffect, useState } from "preact/hooks"

export type Position = {
    x: number,
    y: number
}

const usePointer = () => {
    const [pointerValue, setPointerValue] = useState<Position>({ x: 0, y: 0 })

    useEffect(() => {
        const getPointerValue = (e: any) => {
            setPointerValue({ x: e.pageX, y: e.pageY })
        }

        window.addEventListener("pointermove", getPointerValue)

        return () => window.removeEventListener("pointermove", getPointerValue)
    }, [])

    return pointerValue;
}


export default usePointer;