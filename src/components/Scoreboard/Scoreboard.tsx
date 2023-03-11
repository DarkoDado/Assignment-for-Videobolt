import styles from './scoreboard.module.scss'

export const Scoreboard = () => {
    return (
        <div className={styles.table}>
            <table>
                <tr>

                        <h3>Player 1</h3>
                        <h3>Player 2</h3>

                </tr>
                <tr>
                    
                    
                    <td>Row 1, Column 1</td>
                    <td>Row 1, Column 1</td>
                    <td>3</td>
                    <td>Row 1, Column 2</td>
                    <td>Middle</td>
                </tr>
                <tr>
                    
                   
                    <td>Row 1, Column 1</td>
                    <td>Row 1, Column 1</td>
                    <td>4</td>
                    <td>Row 2, Column 2</td>
                    <td>Middle</td>
                </tr>
                <tr>
                   
                    <td>Row 3, Column 1</td>
                    <td>Row 3, Column 1</td>
                    <td>2</td>
                    <td>Row 3, Column 2</td>
                    <td>Middle</td>
                </tr>
                <tr>
                    
                    
                    <td>Row 4, Column 1</td>
                    <td>Row 4, Column 1</td>
                    <td>11</td>
                    <td>Row 4, Column 2</td>
                    <td>Middle</td>
                </tr>
                <tr>
                    
                    
                    <td>Row 5, Column 1</td>
                    <td>Row 5, Column 1</td>
                    <td>16</td>
                    <td>Row 5, Column 2</td>
                    <td>Middle</td>
                </tr>

                <tr>
                   
                    
                    <td className={styles.t01}>Row 6, Column 1</td>
                    <td>Row 6, Column 1</td>
                    <td>19</td>
                    <td>Row 6, Column 2</td>
                    <td>Middle</td>
                </tr>
            </table>

        </div>
    )
}
