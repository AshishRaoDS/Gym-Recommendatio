import Preact from "preact"

type Props = {
    cursor: any,
    opacity: number
}


const Dot: Preact.FunctionComponent<Props> = ({ cursor, opacity }) => {
    return (
        <div className="dot"
            style={{
                transform: `translate(${cursor.x}px, ${cursor.y}px)`,
                opacity: opacity,
                // top: cursor.x,
                // left: cursor.y
            }}
        >

        </div>
    )
}

export default Dot