import { PlayersType } from "../Players/Player"
import { useSelector, useDispatch } from 'react-redux';
import { players, RESET_GAME } from '../../store/initialState';
import { Score } from './Score';
import { Winner } from "../Winner/Winner";
interface GameScreenProps {
    playersList: PlayersType;
}


export const GameScreen = ({ currentPlayerS, onThrowDart, score, isGameOver, winner }: any) => {
    const dispatch = useDispatch()
    const handleReset = () => {
        dispatch(RESET_GAME({}))
    }
    const playersList = useSelector(players)
    return (
        <div>
            {isGameOver && winner ? (<Winner winner={winner}/>) : (
                 (playersList.map((player: PlayersType) => (
                    <div key={player.id}>
                        <p>{player.name}</p>
                        {player.id === currentPlayerS?.id && (
                            <p>Poeni: {currentPlayerS?.score}</p>
                        )}
                        <p>Igraci :
                            
                            <button onClick={handleReset}>Resetuj igru</button>
    
                            <p>Trenutni igrac na potezu: {currentPlayerS?.name}</p>
                            <Score onThrowDart={onThrowDart} score={score} /></p>
                    </div>
                )))
            )}
           
        </div>
    )
}
