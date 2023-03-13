import { useSelector, useDispatch } from 'react-redux';
import { isGameStarted, START_GAME, players, NEXT_PLAYER, currentPlayerId, RootState, UPDATE_PLAYER_SCORE, selectCurrentPlayer } from '../../store/initialState';
import { Player } from '../Players/Player';
import { PlayersType } from '../Players/Player';
import { Players } from '../Players/Players';
import { Score } from './Score';
import { useState } from 'react';


export const Game: React.FC = () => {

    const [currentScore, setCurrentScore] = useState(501)
    const dispatch = useDispatch()
    const currentPlayerFromStore = useSelector(selectCurrentPlayer)

    const handleStartGame = () => {
        dispatch(START_GAME(startGame))
    }
    const nextPlayer = () => {
        dispatch(NEXT_PLAYER(players))
        

    }

    function onThrowDart(score: number): any {
        const randomPoints = Math.floor(Math.random() * 60) + 1
        const newScore = currentScore - randomPoints
        setCurrentScore(newScore)

        dispatch(UPDATE_PLAYER_SCORE({ CurrPlayerId:currentPlayerFromStore.id, newScore }))
    }

    
    const players = useSelector((state: RootState) => state.game.present.players);

    // const players1 = useSelector(players)

    const startGame = useSelector(isGameStarted)
    // const currentPlayer = players1
    let currentPlayerS = currentPlayerFromStore ? players.find(player => player.id === currentPlayerFromStore.id) : null;
    return (
        <div>
            {!startGame ? (
                <>
                    <button onClick={handleStartGame}>Pokreni igru</button>
                    <Players />
                </>

            ) : (
                <>
                    <p>Igra je u toku</p>
                    {players.map((player: PlayersType) => (
                        <div key={player.id}>
                            <p>{player.name}</p>
                            {player.id === currentPlayerS?.id && (
                                <p>Poeni: {currentPlayerS?.score}</p>
                            )}
                        </div>
                    ))}
                    <p>Igraci : {players.map((player: PlayersType) => (
                        <>
                            <p key={player.id}>{player.name}</p>
                            <p>Poeni:{currentPlayerS?.score}</p>

                        </>
                    ))}
                        <button onClick={nextPlayer}>Sledeci igrac</button>
                        <p>Trenutni igrac na potezu: {currentPlayerS?.name}</p>
                        <Score onThrowDart={onThrowDart} score={currentScore} /></p>

                </>

            )}
        </div>
    )
}
