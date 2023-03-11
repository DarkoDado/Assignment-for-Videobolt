import styles from './search.module.scss'
import { CiSearch } from "react-icons/ci"

const Search: React.FC = () => {
    return (

        <div className={styles.search}><input type="text" placeholder='Search...' />
         <button><CiSearch /></button></div>
         
)}

export default Search