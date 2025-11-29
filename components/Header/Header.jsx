import styles from './Header.module.css';
import TopSection from './TopSection/TopSection';
import BottomSection from './BottomSection/BottomSection';
import {memo, useContext} from 'react';
import { ContextObj } from '../TextEditor/TextEditor';

const Header = memo(
    
    function(props){
        const contextObj = useContext(ContextObj);

        console.log('re-rendered Header...');
        return(
            <header className={styles.container}>
                <TopSection />
                <BottomSection readFileRef={contextObj.readFileRef} fileToEditRef={contextObj.fileToEditRef} createEditContentRef={contextObj.createEditContentRef}/>
            </header>
        );
    }
);


export default Header;