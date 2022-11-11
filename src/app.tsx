import { useEffect, useState } from 'preact/hooks'
import './app.css'
import WheelComponent from 'react-wheel-of-prizes'
import usePointer from './hooks/usePointer'
import useDelay from './hooks/useDelay'
import Dot from './Dot'
// import 'react-wheel-of-prizes/dist/index.css'

enum Decision {
  GYM = 'Go to gym',
  NO_GYM = 'Don\'t go to gym'
}

export function App() {
  const [decision, setDecision] = useState<Decision | null>(null)
  const [victoryAudio] = useState(new Audio('/rock_smell.mp3'))
  const [motivationAudio] = useState(new Audio('/motivation.mp3'))
  const [gymNowAudio] = useState(new Audio('/gym_now.mp3'))
  const [secondNoGymScreen, setSecondNoGymScreen] = useState(false)

  const segments = [
    'Go to gym',
    'Don\'t go to gym',
  ]

  const segColors = [
    '#FFD97D',
    '#FF5154',
  ]

  const onFinished = (winner: Decision) => {
    victoryAudio.pause()
    motivationAudio.pause()
    gymNowAudio.pause()
    console.log(winner)
    setDecision(winner)
  }

  const position = usePointer()
  const delayPostion1 = useDelay(position, 100)
  const delayPostion2 = useDelay(position, 200)
  const delayPostion3 = useDelay(position, 300)
  const delayPostion4 = useDelay(position, 400)

  useEffect(() => {
    if (decision === Decision.GYM) {
      victoryAudio.play()
    }

    if (decision === Decision.NO_GYM) {
      setTimeout(() => {
        setSecondNoGymScreen(true)
        motivationAudio.play()
      }, 2000)

      setTimeout(() => {
        gymNowAudio.play()
      }, 4000)
    }

    return () => {
      victoryAudio.pause()
      motivationAudio.pause()
      gymNowAudio.pause()

    }
  }, [decision])


  return (
    <>
      <h1>Should you or should you not?</h1>
      <div className="questionDiv">
        <p>Should I go to the gym today?</p>
        <p>Or</p>
        <p>Should I not?</p>
        <p>That is a perpetual quesiton isn't it?</p>
      </div>
      <div className="questionDiv">
        <p>Some days, the answer is obvious. But there are these other days when it isn't so obvious</p>
        <p>Especially when it isn't obvious, one tends to lean towards inaction.</p>
        <p>So instead of taking the burden of deciding it yourself, how about we let luck take its course and decide it for us.</p>
      </div>

      <WheelComponent
        segments={segments}
        segColors={segColors}
        onFinished={(winner: Decision) => onFinished(winner)}
        primaryColor='#91A6FF'
        contrastColor='black'
        buttonText='Spin Boi'
        isOnlyOnce={false}
        size={220}
        upDuration={100}
        downDuration={1000}
        fontFamily='Arial'
      />
      {
        decision === Decision.GYM &&
        <div className="questionDiv gymSuccess">
          <p>There</p>
          <p>The fortune has spoken</p>
          <p>Now get your ass off that bed and pump that iron till you can't no more</p>
        </div>
      }
      {
        decision === Decision.NO_GYM &&
        <div className="questionDiv gymSuccess">
          {
            !secondNoGymScreen &&
            <>
              <p>Well well well</p>
              <p>The fate doesn't think you should go</p>
            </>
          }
          {
            secondNoGymScreen &&
            <>
              <p>We don't let fate stop us right</p>
              <p>What's the point if a spinner decides what's best for us</p>
            </>
          }
        </div>
      }

      <Dot key="firstDot" cursor={delayPostion1} opacity={0.6} />
      <Dot key="secondDot" cursor={delayPostion2} opacity={0.4} />
      <Dot key="thirdKey" cursor={delayPostion3} opacity={0.3} />
      <Dot key="fourthKey" cursor={delayPostion4} opacity={0.2} />
    </>
  )
}
