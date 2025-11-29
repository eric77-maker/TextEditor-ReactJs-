import styles from './Font.module.css';
import { useState, useRef } from 'react';
import Family from './Family/Family';
import Size from './SIze/Size';
import Color from './Color/Color';
import Bold from './Bold/Bold';
import Italic from './Italic/Italic';
import Underline from './Underline/Underline';



export default function Font(props){
    const [hideFontInput, setHideFontInput] = useState(true);

    return(
        <div className={styles.fontDiv}>
            <div>
                <Family />
                <Size setHideFontInput={setHideFontInput} />
                <Color setHideFontInput={setHideFontInput} />
            </div>

            <div>
                <Bold setHideFontInput={setHideFontInput} />
                <Italic setHideFontInput={setHideFontInput} />
                <Underline setHideFontInput={setHideFontInput} />
            </div>
        </div>
    );
}