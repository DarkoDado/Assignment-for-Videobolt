import React from 'react'
import styles from "./header.module.scss"
import Search from './Search';
import Menu from './Menu';
import { MdOutlineLogin } from 'react-icons/md'
import { BiUserPlus } from 'react-icons/bi'



export const Header = () => {
  return (

    <div className={styles.header}>

      <span>

        <button className={styles.login}><MdOutlineLogin />Login</button>
        <button className={styles.tryff}><BiUserPlus />Try for free</button>
      </span>
      <Search />

      <Menu />
    </div>




  )
}
