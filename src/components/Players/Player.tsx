import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { REMOVE_PLAYER } from '../../store/initialState';
import styles from './players.module.scss'

export type PlayersType = {
    name: string,
    id: number,
    winner: boolean | null
    score: number,
    penalty: number,
    hits: (number | never)[]
}

export const Player = ({ name, id }: PlayersType) => {
  
 // const playersList = useSelector(players)
const dispatch = useDispatch()

  const removePlayer = (id: number) => {
    dispatch(REMOVE_PLAYER(id))
  }

  return (
    <div className={styles.container}>
      <div className={styles.player}><span>{name}</span>
      <button className={styles.removeBtn} onClick={() => removePlayer(id)}>{<MdDelete />}</button></div>

       <span>
      
      </span>
    </div>
  )
}
