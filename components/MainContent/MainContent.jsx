import styles from './MainContent.module.css';
import HomeToolKit from '../Header/BottomSection/HomeToolKit/HomeToolKit';
import InsertToolKit from '../Header/BottomSection/InsertToolKit/InsertToolKit';
import SideBar from './SideBar/SideBar';
import SideBarDropDown from './SideBarDropDown/SideBarDropDown';
import CreateFile from './Content/CreateFile/CreateFile';
import ReadFile from './Content/ReadFile/ReadFile';
import ReviewFile from './Content/ReviewFile/ReviewFile';
import EditFile from './Content/EditFile/EditFile';


import {useState, useContext, memo } from 'react';
import { ContextObj } from '../TextEditor/TextEditor';

const MainContent = memo(
    function(props){
        const contextObj = useContext(ContextObj);
    
    
        const unmountToolKit = () =>{
            if(contextObj.componentMountToggler.toolKit === 'home' || contextObj.componentMountToggler.toolKit === 'insert'){
                contextObj.setComponentMountToggler(c => ({...c, toolKit: ''}));
            }
        };
        return(
            <main id={styles.container} className={contextObj.modeState === 'light'? styles.containerLight : styles.containerDark}>      
                {contextObj.componentMountToggler.toolKit === 'home' && <HomeToolKit />}
                {contextObj.componentMountToggler.toolKit === 'insert' && <InsertToolKit />}
                {contextObj.toggleContentSize && <SideBarDropDown readFileRef={contextObj.readFileRef} fileToEditRef={contextObj.fileToEditRef} />}
                {!(contextObj.componentMountToggler.actionContent === 'file' || contextObj.componentMountToggler.actionContent === 'help') && !contextObj.toggleContentSize && <SideBar readFileRef={contextObj.readFileRef} fileToEditRef={contextObj.fileToEditRef} />} 
                <section className={styles.content} /* onClick={() => unmountToolKit()} */>
                    <h1 className={styles.backgroundText}>
                        EDITX
                    </h1>
                    {contextObj.componentMountToggler.actionContent === 'create' && <CreateFile modeState={contextObj.modeState}/>}
                    {contextObj.componentMountToggler.actionContent === 'read' && <ReadFile fileName={contextObj.fileName}/>}
                    {contextObj.componentMountToggler.actionContent === 'edit' && <EditFile  fileName={contextObj.fileName}/>}
                    {contextObj.componentMountToggler.actionContent === 'review' && <ReviewFile />}
                </section>          
            </main>
        );
    }
);



export default MainContent;