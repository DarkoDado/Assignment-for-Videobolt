import { useSelector, useDispatch } from 'react-redux';
import { isGameStarted, START_GAME, players, NEXT_PLAYER, currentPlayerId, RootState, UPDATE_PLAYER_SCORE, selectCurrentPlayer, RESET_GAME, selectWinner } from '../../store/initialState';
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

    const startGame = useSelector(isGameStarted)
    const [isGameOver, setIsGameOver] = useState(false);

    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)

    const dispatch = useDispatch()
    const playersList = useSelector(players);
    const currentPlayerFromStore = useSelector(selectCurrentPlayer)





    const handleStartGame = () => {
        dispatch(START_GAME(true))
        setIsGameOver(false)
    }




    useEffect(() => {
        if (throwCount >= 3) {
            setThrowCount(0)
            setCurrentPlayerIndex((currentPlayerIndex + 1) % playersList.length)
        }
    }, [throwCount, currentPlayerIndex, playersList, currentScore])




    function onThrowDart(score: number): any {

        const validScores = [0, 25, 50, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        const randomIndex = Math.floor(Math.random() * validScores.length);
        const randomScore = validScores[randomIndex];
        const newScore = currentScore - randomScore;
       
        // const randomPoints = Math.floor(Math.random() * 60) + 1
        // const newScore = currentScore - randomPoints

        if (newScore > 0) {
            setCurrentScore(newScore)

            dispatch(UPDATE_PLAYER_SCORE({ CurrPlayerId: currentPlayerFromStore.id, newScore }))
        } else if (newScore <= 0) {
            dispatch(UPDATE_PLAYER_SCORE({ CurrPlayerId: currentPlayerFromStore.id, newScore }))
            setCurrentScore(501)
            setIsGameOver(true)
        } else {
            setCurrentScore(501)
        }
        setThrowCount(throwCount + 1)
        if (throwCount >= 2) {
            dispatch(NEXT_PLAYER(players))
            setThrowCount(0)
        }
    }









    const resetGame = () => {
        dispatch(RESET_GAME())
        setThrowCount(0)
        setCurrentScore(501)
    }

    const winner = playersList.find(player => player.winner === true)?.name;


    let currentPlayerS = currentPlayerFromStore ? playersList.find(player => player.id === currentPlayerFromStore.id) : null;
    return (
        <div>

            {!startGame ? (
                <>
                    <button onClick={handleStartGame}>Pokreni igru</button>

                    <Players />
                </>

            ) : (
                <>
                    <GameScreen resetGame={resetGame} setThrowCount={setThrowCount} currentPlayerS={currentPlayerS} onThrowDart={onThrowDart} score={currentScore} isGameOver={isGameOver} />
                    {isGameOver && <div><p>Pobjednik je :{winner}</p>
                    <button onClick={resetGame}>Zapocni novu igru</button></div>}




                </>

            )}

        </div>
    )
}
