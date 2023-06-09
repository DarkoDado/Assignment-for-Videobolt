import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import {
  isGameStarted,
  START_GAME,
  players,
  NEXT_PLAYER,
  UPDATE_PLAYER_SCORE,
  selectCurrentPlayer,
  RESET_GAME
} from '../../store/initialState'
import type { Player } from '../../store/initialState'
import { Players } from '../Players/Players'
import { GameScreen } from './GameScreen'
import styles from './styles.module.scss'

export const Game = (): JSX.Element => {
  const [currentScore, setCurrentScore] = useState<number>(501)
  const [currentPlayerScore, setCurrentPlayerScore] = useState<number>(501)
  const [throwCount, setThrowCount] = useState<number>(0)

  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0)
  const startGame = useSelector(isGameStarted)

  const dispatch = useDispatch()
  const playersList = useSelector(players)
  const currentPlayerFromStore = useSelector(selectCurrentPlayer)

  const handleStartGame = (): void => {
    dispatch(START_GAME())
    setIsGameOver(false)
  }

  function onThrowDart (): void {
    const validScores = [
      0, 25, 50, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
      19, 20
    ]
    const randomIndex: number = Math.floor(Math.random() * validScores.length)
    const randomScore: number = validScores[randomIndex]
    const newScore: number = currentScore - randomScore

    // const randomPoints = Math.floor(Math.random() * 60) + 1
    // const newScore = currentScore - randomPoints
    if (newScore > 0) {
      setCurrentScore(newScore)
      setCurrentPlayerScore(currentPlayerScore - randomScore)
      dispatch(
        UPDATE_PLAYER_SCORE({
          CurrPlayerId: currentPlayerFromStore.id,
          newScore,
          hit: randomScore
        })
      )
    } else if (newScore <= 0) {
      dispatch(
        UPDATE_PLAYER_SCORE({
          CurrPlayerId: currentPlayerFromStore.id,
          newScore
        })
      )
      setCurrentScore(501)
      setCurrentPlayerScore(501)
      setIsGameOver(true)
    } else {
      setCurrentScore(501)
    }
    setThrowCount(throwCount + 1)
  }

  const nextPlayer = (): void => {
    // update-uje poene trenutnog igraca
    dispatch(
      UPDATE_PLAYER_SCORE({
        CurrPlayerId: currentPlayerFromStore.id,
        newScore: currentPlayerScore
      })
    )
    // update za sledeceg igraca
    const nextPlayerIndex: number =
      currentPlayerIndex === playersList.length - 1
        ? 0
        : currentPlayerIndex + 1
    const nextPlayerFromStore: Player = playersList[nextPlayerIndex]
    setCurrentPlayerIndex(nextPlayerIndex)

    setCurrentScore(nextPlayerFromStore.score)
    setCurrentPlayerScore(nextPlayerFromStore.score)
  }

  useEffect(() => {
    if (throwCount >= 3) {
      nextPlayer()
      dispatch(NEXT_PLAYER())
      setThrowCount(0)
    }
  }, [currentPlayerScore])

  const resetGame = (): void => {
    dispatch(RESET_GAME())
    setThrowCount(0)
    setCurrentScore(501)
  }

  const winner = playersList.find((player) => player.winner)?.name // player.winner === true

  const currentPlayerS = playersList.find((player) => player.id === currentPlayerFromStore.id)

  return (

    <div className={styles.container}>
  <>
  {!startGame && (
    <button className={styles.startGameBtn} onClick={handleStartGame}>
      Pokreni igru
    </button>
  )}
  <Players />
</>
          <div className={isGameOver ? `${styles.showGame}` : ''}>
            <GameScreen
              resetGame={resetGame}
              setThrowCount={setThrowCount}
              currentPlayerS={currentPlayerS}
              throwDart={onThrowDart}
              score={currentScore}
              isGameOver={isGameOver}
            />
          </div>
          {isGameOver && (
    <div>
      <h3 className={styles.blink}>Pobednik je: {winner}</h3>
      <button className={styles.btnGame} onClick={resetGame}>
        Zapocni novu igru
      </button>
    </div>
          )}
</div>
  )
}
