import styles from './MainContent.module.css';
import HomeToolKit from '../Header/BottomSection/HomeToolKit/HomeToolKit';
import SideBar from './SideBar/SideBar';
import SideBarDropDown from './SideBarDropDown/SideBarDropDown';
import CreateFile from './Content/CreateFile/CreateFile';
import ReadFile from './Content/ReadFile/ReadFile';
import ReviewFile from './Content/ReviewFile/ReviewFile';
import EditFile from './Content/EditFile/EditFile';
import {motion} from 'framer-motion'

import { useContext, memo } from 'react';
import { ContextObj } from '../TextEditor/TextEditor';

//renders all components individually on condition(s) except the Header, SearchCover and Header sub components.
const MainContent = memo(
    function(props){
        const contextObj = useContext(ContextObj);
        
        console.log('re-rendered MainContent....');
        return(
            <main id={styles.container} className={contextObj.modeState === 'light'? styles.containerLight : styles.containerDark}>      
                {contextObj.componentMountToggler.toolKit === 'home' && <HomeToolKit />}
                {contextObj.toggleContentSize && <SideBarDropDown readFileRef={contextObj.readFileRef} fileToEditRef={contextObj.fileToEditRef} />}
                {!(contextObj.componentMountToggler.actionContent === 'file' || contextObj.componentMountToggler.actionContent === 'help') && !contextObj.toggleContentSize && <SideBar readFileRef={contextObj.readFileRef} fileToEditRef={contextObj.fileToEditRef} />} 
                <section className={styles.content} >
                    <h1 className={styles.backgroundText}>
                        EDITX
                    </h1>
                    {contextObj.componentMountToggler.actionContent === 'create' && <CreateFile showLinkInput={props.showLinkInput} modeState={props.modeState} lastChosenColorForLIMarker={props.lastChosenColorForLIMarker}/>}
                    {contextObj.componentMountToggler.actionContent === 'read' && <ReadFile fileName={contextObj.fileName} modeState={props.modeState}/>}
                    {contextObj.componentMountToggler.actionContent === 'edit' && <EditFile toggleSearch={props.toggleSearch} promptWithoutSavingChangesOnEdit={contextObj.promptWithoutSavingChangesOnEdit} setPromptWithoutSavingChangesOnEdit={contextObj.setPromptWithoutSavingChangesOnEdit} showLinkInput={props.showLinkInput}  fileName={contextObj.fileName} lastChosenColorForLIMarker={props.lastChosenColorForLIMarker}/>}
                    {contextObj.componentMountToggler.actionContent === 'review' && <ReviewFile />}
                </section>          
            </main>
        );
    }
);



export default MainContent;