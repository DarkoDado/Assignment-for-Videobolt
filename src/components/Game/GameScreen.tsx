import { PlayersType } from "../Players/Player"
import { useSelector, useDispatch } from 'react-redux';
import { isGameStarted, players, RESET_GAME } from '../../store/initialState';
import { Score } from './Score';
import { Winner } from "../Winner/Winner";
interface GameScreenProps {
    playersList: PlayersType;
}


export const GameScreen = ({ setThrowCount, currentPlayerS, onThrowDart, score, isGameOver, winner, resetGame }: any) => {
    const startGame = useSelector(isGameStarted)
    const dispatch = useDispatch()


    const playersList = useSelector(players)
    return (
        <div>
            {isGameOver   ? (<Winner/>) : (
                 (playersList.map((player: PlayersType) => (
                    <div key={player.id}>
                        <p>{player.name}</p>
                        {player.id === currentPlayerS?.id && (
                            <p>Poeni: {currentPlayerS?.score}</p>
                        )}
                        <p>Igraci :
                            
                            <button onClick={resetGame}>Resetuj igru</button>
    
                            <p>Trenutni igrac na potezu: {currentPlayerS?.name}</p>
                            <Score onThrowDart={onThrowDart} score={score} /></p>
                    </div>
                )))
            )}
           
        </div>
    )
}
