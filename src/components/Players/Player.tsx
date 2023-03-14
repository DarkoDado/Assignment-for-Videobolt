import { useDispatch} from 'react-redux';
import { REMOVE_PLAYER } from '../../store/initialState';
export type PlayersType = {
    name: string,
    id:number,
    winner: boolean| null
    score:number,
    penalty:number,
    hits:number,
}

export const Player = ({name, id}: PlayersType) => {
  
 // const playersList = useSelector(players)
const dispatch = useDispatch()

  const removePlayer = (id:number) => {
    dispatch(REMOVE_PLAYER(id))
  }

  return (
    <div>
        <li key={id}>
            {name}
        </li>
        <li><button onClick={() => removePlayer(id)}>Izbrisi</button></li>
    </div>
  )
}
