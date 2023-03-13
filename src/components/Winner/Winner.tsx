import { useDispatch } from 'react-redux';
import { RESET_GAME } from '../../store/initialState';

export const Winner = ({winner}:any) => {
const dispatch = useDispatch()
  const newGame = () => {
    dispatch(RESET_GAME({}))
}
  return (
    <div>{winner.name} je pobednik!
    <button onClick={newGame}>Zapocni novu igru</button></div>
  )
}
