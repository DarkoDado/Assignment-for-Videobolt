import { PlayersType } from "../Players/Player"
import { useSelector } from 'react-redux';
import { players, selectCurrentPlayer } from '../../store/initialState';
import { Winner } from '../Winner/Winner';
import styles from './styles.module.scss'

export const GameScreen = ({  currentPlayerS, throwDart, isGameOver }: any) => {
    const playersList = useSelector(players)

    return (
        <div className={styles.container}>
            {isGameOver ? (<Winner />) : (
                (playersList.map((player: PlayersType) => (
                    
                    <div key={player.id} className={styles.playerFunc}>
                        <p>Igrac {player.id + 1}</p>
                        <p>{player.name}</p>
                        <p>Poeni: {player.score}</p>

                        <div className={styles.hits}>
                            <h4>Trenutni pogoci: </h4>
                            <p>{player.hits.join(", ")}</p>

                        </div>
                    </div>
                    
                )))

            )} {!isGameOver && <><div className={styles.playerBtn}><h3>Igrac na potezu: <span>{currentPlayerS?.name}</span></h3>
                <button className={styles.btnGame} onClick={throwDart}>Baci Strelicu</button></div></>
            }
        </div>
    )
}

