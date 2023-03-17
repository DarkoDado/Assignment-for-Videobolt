import type { PlayersType } from '../Players/Player'
import { useSelector } from 'react-redux'
import React from 'react'
import { players } from '../../store/initialState'
import { Winner } from '../Winner/Winner'
import styles from './styles.module.scss'

interface GameScreenProps {
  currentPlayerS?: PlayersType | null
  throwDart: () => void
  isGameOver: boolean
  setThrowCount: React.Dispatch<React.SetStateAction<number>>
  score: number
}

interface GameScreenProps {
  resetGame: () => void
  throwDart: () => void
}

export const GameScreen = ({
  currentPlayerS,
  throwDart,
  isGameOver
}: GameScreenProps): JSX.Element => {
  const playersList = useSelector(players)

  return (
    <div className={styles.container}>
      {isGameOver
        ? (
        <Winner />
          )
        : (
            playersList.map((player: PlayersType) => (
          <div key={player.id} className={styles.playerFunc}>
            <p>Igrac {player.id + 1}</p>
            <p>{player.name}</p>
            <p>Poeni: {player.score}</p>

            <div className={styles.hits}>
              <h4>Trenutni pogoci: </h4>
              <p>{player.hits.join(', ')}</p>
            </div>
          </div>
            ))
          )}{' '}
      {!isGameOver && (
        <>
          <div className={styles.playerBtn}>
            <h3>
              Igrac na potezu: <span>{currentPlayerS?.name}</span>
            </h3>
            <button className={styles.btnGame} onClick={throwDart}>
              Baci Strelicu
            </button>
          </div>
        </>
      )}
    </div>
  )
}
