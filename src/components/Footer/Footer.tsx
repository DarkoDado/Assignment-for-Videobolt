import { Link } from "react-router-dom"
import styles from "./footer.module.scss"
import { FaFacebook } from 'react-icons/fa'
import { BsYoutube } from 'react-icons/bs'
import { BsTwitter } from 'react-icons/bs'
import { ImLinkedin } from 'react-icons/im'
import { BsInstagram } from 'react-icons/bs'

type Props = {
    to: string
}
let date = new Date().getFullYear();
export const Footer = ({ to }: Props) => {
    return (
        <div className={styles.footer}>
            <h3>Company</h3>

            <a href="*">About us</a>
            <a href="*">Contact</a>
            <a href="*">Terms & Conditins</a>
            <a href="*">Privacy Policy</a>

            <span>
                <h4>&copy; {date} videobolt.net</h4>
            </span>
            <div className={styles.icons}>
                <FaFacebook />
                <BsYoutube />
                <BsTwitter />
                <ImLinkedin />
                <BsInstagram />
            </div>

        </div>
    )
}
