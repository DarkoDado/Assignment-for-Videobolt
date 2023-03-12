import { useSelector, useDispatch } from 'react-redux';
import { isGameStarted } from '../../store/initialState';
import { Player } from '../Players/Player';
import { Players } from '../Players/Players';


export const Game: React.FC = () => {
    const dispatch = useDispatch()

    const handleStartGame = () => {

    }

    const startGame = useSelector(isGameStarted)
    return (
        <div>
            {!startGame ? (
                <>
                    <button>Pokreni igru</button>
                    <Players />
                </>

            ) : (
                <>            <p>Igra je u toku</p>

                </>

            )}
        </div>
    )
}
