import styles from './TopSection.module.css';
import heroImg from '/src/assets/TopSectionImgs/heroImg.svg';
import openFileImg from '/src/assets/TopSectionImgs/openFile.svg';
import saveFileImg from '/src/assets/TopSectionImgs/savefile.svg';
import undoActionImg from '/src/assets/TopSectionImgs/undoAction.svg';
import redoActionImg from '/src/assets/TopSectionImgs/redoAction.svg';
import printTextImg from '/src/assets/TopSectionImgs/printText.svg';
import searchFileImg from '/src/assets/TopSectionImgs/search.png';
import Menu from './Menu/Menu';
import DropDownMenu from './DropDownMenu/DropDownMenu';
import Mode from './Mode/Mode';
import { useEffect, useState, useContext } from 'react';
import { ContextObj } from '../../TextEditor/TextEditor';




export default function TopSection(){
    const contextObj = useContext(ContextObj);
    const [toggleMenuState, setToggleMenuState] = useState('default');

    useEffect(() =>{
        if(window.innerWidth <= 300){
            setToggleMenuState('drop');
        };
    }, []);

    useEffect(() =>{
        let intervalToken;
        const throttleScreenResize = (fn, interval) =>{
            return e =>{
                intervalToken = setInterval(() => fn(e), interval);
            };
        };

        const changeMenuStateHandler = e =>{
            if(e.target.innerWidth <= 300){
                setToggleMenuState('drop');
            }else{
                setToggleMenuState('default');
            }
        };

        window.addEventListener('resize', throttleScreenResize(changeMenuStateHandler, 2000));

        return () =>{
            clearInterval(intervalToken);
            window.removeEventListener('resize', throttleScreenResize);
        };
    }, []);

    return(
        <section className={styles.container}>
            <div>
                <img className={styles.heroImg} src={heroImg} alt="" />
                <h1>
                    EditX
                </h1>

                {toggleMenuState === 'default' && <Menu imgs={{ openFileImg, saveFileImg, undoActionImg, redoActionImg, printTextImg }} />}
   
                {toggleMenuState === 'drop' && <DropDownMenu imgs={{ openFileImg, saveFileImg, undoActionImg, redoActionImg, printTextImg }} />}
            </div>
    
    
            <div style={{flex: '1', display: 'flex', justifyContent: 'center'}}>
                <button style={contextObj.modeState === 'light'? {backgroundColor: 'hsl(240, 48%, 65%, 0.2)', boxShadow: '1px 1px 1px hsl(240, 48%, 65%, 0.4)'} : {backgroundColor: '#fff', boxShadow: '1px 1px 1px gray'}}
                 onClick={() => contextObj.setToggleSearch(true)} className={styles.searchBtn}>
                    <img style={{opacity: '0.6'}} src={searchFileImg} alt="" width={10} height={10}/>
                </button>
            </div>
            <Mode />
        </section>
    );
};