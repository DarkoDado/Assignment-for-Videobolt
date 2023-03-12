import { useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { players, ADD_PLAYER } from '../../store/initialState';
import { PlayersType } from './Player';
import { Player } from './Player';
import styles from './players.module.scss'


export const Players = () => {
  const dispatch = useDispatch()
  const playersList = useSelector(players)
  // const [refreshedPlayers, setRefreshedPlayers] = useState(playersList)

  const [name, setName] = useState('')
  const handleAddPlayer = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()

    if (name && name.trim() !== '') {
      const newPlayer = {
        id: playersList.length +1 || 0,
        name: name,
        score: 0,
        penalty: 0,
        hits: 0
      }
      
      // setRefreshedPlayers([...refreshedPlayers, newPlayer])
      dispatch(ADD_PLAYER(newPlayer )) 
      setName('')
    }

  }
  // const addPlayer: React.FC = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault()
  //   if(!input.value.trim()) 
  //   return

  // }
  console.log(playersList)


  return (
    <div className={styles.players}>
      <form onSubmit={handleAddPlayer}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <button type="submit">Dodaj igraca</button>
      </form>
      <h3>Igraci</h3>
      {playersList.map((player: PlayersType) => {
        return (
          <Player key={player.id} {...player} />
        )
      })}</div>
  )
}
