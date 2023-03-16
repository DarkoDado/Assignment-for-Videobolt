import { useSelector } from 'react-redux';
import { isGameStarted, players } from '../../store/initialState';

export const Winner = () => {
  const playersList = useSelector(players)
  const startGame = useSelector(isGameStarted)

  const winner = playersList.find(player => player.winner)?.name;
  return (
    <div>
{!startGame ? <p>{winner}</p> : ''}
    </div>
  )
}
