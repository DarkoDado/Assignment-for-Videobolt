import { useDispatch, useSelector } from 'react-redux';
import { isGameStarted, RESET_GAME, START_GAME, selectWinner, players } from '../../store/initialState';
import { Game } from '../Game/Game';
import { useNavigate } from 'react-router-dom';
import { Players } from '../Players/Players';


export const Winner = ({ isGameOver }: any) => {

  const playersList = useSelector(players)
  const startGame = useSelector(isGameStarted)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const newGame = () => {
    dispatch(RESET_GAME())
  }
  const winner = playersList.find(player => player.winner === true)?.name;

  const handleFindWinner = () => {

  }
  return (
    <div>
{!startGame ? <p>{winner}</p> : ""}
    </div>
  )
}

{/* <div>

      {startGame ? (
        <>
          <p>{typeof winner === "number" && (
            <p>Winner is player {winner}</p>
            
          )}</p>
         
          )
        </>
      ) : isGameOver ? (
        <>
          <p>Nema pobjednika.</p>
          <button onClick={newGame}>Nova igra</button>
        </>
      ) : (
        
        <p>Igra je u toku.</p>
      )}
      )
    </div> */}