import styles from './Insert.module.css';
import List from './List/List';
import Paragraph from './Paragraph/Paragraph';
import Link from './Link/Link';
import Rule from './Rule/Rule';
import { useContext } from 'react';
import { ContextObj } from '../../../../TextEditor/TextEditor';





export default function Insert(){
    const contextObj = useContext(ContextObj);

    return(
        <div className={styles.container}>
            <p className={contextObj.modeState === 'light'? styles.iTextLight : styles.iTextDark} style={{fontSize: '1.2rem'}}>
                INSERT
            </p>
            <List />
            <Paragraph />
            <Link />
            <Rule />
    </div>
    );
}