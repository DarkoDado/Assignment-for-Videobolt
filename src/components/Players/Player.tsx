import { MdDelete } from 'react-icons/md'
import React from 'react'
import { useDispatch } from 'react-redux'
import { REMOVE_PLAYER } from '../../store/initialState'
import styles from './players.module.scss'

export interface PlayersType {
  id: number
  name: string
  score: number
  winner: boolean
  hits: Array<number | undefined>
}

export const Player: React.FC<PlayersType> = ({ name, id }: PlayersType): JSX.Element => {
// const playersList = useSelector(players)
  const dispatch = useDispatch()

  const removePlayer = (id: number): void => {
    dispatch(REMOVE_PLAYER(id))
  }

  return (
    <div className={styles.container}>
      <div className={styles.player}><span>{name}</span>
      <button className={styles.removeBtn} onClick={() => { removePlayer(id) } }>{<MdDelete />}</button></div>

      <span>
      </span>
    </div>
  )
}
