import { useSelector, useDispatch } from 'react-redux';
import { isGameStarted, START_GAME, players, NEXT_PLAYER, currentPlayerId, RootState, UPDATE_PLAYER_SCORE, selectCurrentPlayer, RESET_GAME, FIND_WINNER } from '../../store/initialState';
import { Player } from '../Players/Player';
import { PlayersType } from '../Players/Player';
import { Players } from '../Players/Players';
import { Score } from './Score';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Winner } from '../Winner/Winner';
import { GameScreen } from './GameScreen';


export const Game: React.FC = () => {

    const [currentScore, setCurrentScore] = useState(501)
    const [throwCount, setThrowCount] = useState(0)
    const [isGameOver, setIsGameOver] = useState(false);

    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)

    const dispatch = useDispatch()
    const playersList = useSelector(players);
    const currentPlayerFromStore = useSelector(selectCurrentPlayer)


    // const winner = playersList.find(player => player.score <=0)


    const handleStartGame = () => {
        dispatch(START_GAME(true))
    }




    useEffect(() => {
        if (throwCount >= 3) {
            setThrowCount(0)
            setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length)
        }
    }, [throwCount, currentPlayerIndex, players, currentScore])





    function onThrowDart(score: number): any {
        const randomPoints = Math.floor(Math.random() * 60) + 1
        const newScore = currentScore - randomPoints
        if (newScore > 0) {
            setCurrentScore(newScore)

            dispatch(UPDATE_PLAYER_SCORE({ CurrPlayerId: currentPlayerFromStore.id, newScore }))
        } else if (newScore === 0) {
            setCurrentScore(501)
            dispatch(RESET_GAME({}))
            const winner = playersList.find(player => player.score <= 0);
            if (winner) {
                setIsGameOver(true);
                dispatch(FIND_WINNER(winner));
            }
        } else {
            setCurrentScore(501)
            dispatch(RESET_GAME({}))
        }
        setThrowCount(throwCount + 1)
        if (throwCount >= 2) {
            dispatch(NEXT_PLAYER(players))
            setThrowCount(0)
        }
    }

    // const nextPlayer = () => {
    //     setThrowCount(0)
    //     setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length)
    //     dispatch(NEXT_PLAYER(players))
    // }

    const handleShowWinner = () => {
        setIsGameOver(true)
    };
   
  


    // const players1 = useSelector(players)

    const startGame = useSelector(isGameStarted)
    // const currentPlayer = players1
    let currentPlayerS = currentPlayerFromStore ? playersList.find(player => player.id === currentPlayerFromStore.id) : null;
    return (
        <div>
           
            {!startGame && !isGameOver ? (
                <>
                    <button onClick={handleStartGame}>Pokreni igru</button>
          
                    <Players />
                </>

            ) : (
                <>
                <GameScreen currentPlayerS={currentPlayerS} onThrowDart={onThrowDart} score={currentScore} winner={winner} isGameOver={isGameOver}/>
                    <p>Igra je u toku</p>
                    {/* {winner && isGameOver && <Winner winner={winner} />} */}
                    {/* {players.map((player: PlayersType) => (
                        <div key={player.id}>
                            <p>{player.name}</p>
                            {player.id === currentPlayerS?.id && (
                                <p>Poeni: {currentPlayerS?.score}</p>
                            )}
                        </div>
                    ))}
                    <p>Igraci :
                       
                        <button >Sledeci igrac</button>
                               
                        <p>Trenutni igrac na potezu: {currentPlayerS?.name}</p>
                        <Score onThrowDart={onThrowDart} score={currentScore} /></p> */}

                </>

            ) }
            
        </div>
    )
}
