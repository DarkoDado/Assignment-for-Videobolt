import React from 'react'
import styles from "./header.module.scss"
import {RxHamburgerMenu} from "react-icons/rx"
import {NavLink} from 'react-router-dom'
const Menu = () => {
  return (
    <>
    <div className={styles.menuDesk}>
    <NavLink to="/">Templates</NavLink>
    <NavLink to="/">Solutions</NavLink>
    <NavLink to="/">Pricing</NavLink>
    <NavLink to="/">Resources</NavLink>
    </div>
    <div className={styles.menuMob}>
    <RxHamburgerMenu />
</div>
</>
  )
}

export default Menu