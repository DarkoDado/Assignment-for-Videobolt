import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { players, ADD_PLAYER } from '../../store/initialState';
import { Player, PlayersType } from './Player';
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
        id: (playersList.length+1) -1,
        name: name,
        score: 501,
        penalty: 0,
        hits: [],
        winner: false,
      }

      dispatch(ADD_PLAYER(newPlayer ))
      setName('')
    }
  }

  return (
    <div className={styles.players}>
      <form onSubmit={handleAddPlayer}>
        <input type="text" placeholder='Ime igraca...' value={name} onChange={e => setName(e.target.value)} />
        <button className={styles.addPlayerBtn} type="submit">Dodaj igraca</button>
      </form>
      <h2>Igraci</h2>

      {playersList.map((player: PlayersType) => {
        return (
        <div key={player.id}><><Player key={player.id} {...player} />
          </></div>)
      })}</div>
  )
}
