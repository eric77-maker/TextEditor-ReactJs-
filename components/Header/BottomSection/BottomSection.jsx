import styles from './BottomSection.module.css';
import { useContext } from 'react';
import { ContextObj } from '../../TextEditor/TextEditor';

export default function BottomSection(props){
    const contextObj = useContext(ContextObj);
    const activeStyle = {color: 'hsl(300, 80%, 20%, 0.8)', textDecoration: 'underline'};
 
    const handleHomeClick = () =>{
        if(contextObj.componentMountToggler.toolKit !== 'home'){
            contextObj.setComponentMountToggler(c => ({...c, toolKit: 'home'}));
        }else{
            contextObj.setComponentMountToggler(c => ({...c, toolKit: '', autofocus: c.autofocus + 1}));
        }
    };


    const handleCreateClick = () =>{
/*         props.fileToEditRef.current = {fileName: null};
        props.readFileRef.current = null; */


/*         if(contextObj.componentMountToggler.actionContent !== 'create' && contextObj.componentMountToggler.actionContent !== ''){
            contextObj.previousComponentRef.current = {actionContent: contextObj.componentMountToggler.actionContent, toolKit: contextObj.componentMountToggler.toolKit};
            contextObj.setComponentMountToggler(c => ({...c, actionContent: 'create', toolKit: ''}));
        }else{
            if(!contextObj.previousComponentRef.current.hasOwnProperty('actionContent')){
                contextObj.setComponentMountToggler(c => ({...c, actionContent: 'create', toolKit: ''}));
            }{
                contextObj.setComponentMountToggler(c => ({...c, actionContent: contextObj.previousComponentRef.current.actionContent, toolKit: contextObj.previousComponentRef.current.toolKit}));
            }
        }; */

        if(contextObj.componentMountToggler.actionContent !== 'create'){
            if(window.frames['createTextInput'] && window.frames['createTextInput'].document.body.innerHTML.length > 0){
                window.frames['createTextInput'].document.body.innerHTML = '';
            };
            contextObj.setComponentMountToggler(c => ({...c, actionContent: 'create'}));
        }
    };

    const handleViewClick = () =>{
        if(contextObj.componentMountToggler.actionContent !== 'view'){
            contextObj.previousComponentRef.current = {actionContent: contextObj.componentMountToggler.actionContent, toolKit: contextObj.componentMountToggler.toolKit};
            contextObj.setComponentMountToggler(c => ({...c, actionContent: 'view', toolKit: ''}));
        }else{
            contextObj.setComponentMountToggler(c => ({...c, actionContent: contextObj.previousComponentRef.current.actionContent, toolKit: contextObj.previousComponentRef.current.toolKit}));
        }
    };

    const handleReviewClick = () =>{
        if(contextObj.componentMountToggler.actionContent !== 'review'){
            contextObj.previousComponentRef.current = {actionContent: contextObj.componentMountToggler.actionContent, toolKit: contextObj.componentMountToggler.toolKit};
            contextObj.setComponentMountToggler(c => ({...c, actionContent: 'review', toolKit: ''}));
        }else{
            contextObj.setComponentMountToggler(c => ({...c, actionContent: contextObj.previousComponentRef.current.actionContent, toolKit: contextObj.previousComponentRef.current.toolKit}));
        }
    };

    const handleHelpClick = () =>{
        if(contextObj.componentMountToggler.actionContent !== 'help'){
            contextObj.previousComponentRef.current = {actionContent: contextObj.componentMountToggler.actionContent, toolKit: contextObj.componentMountToggler.toolKit};
            contextObj.setComponentMountToggler(c => ({...c, actionContent: 'help', toolKit: ''}));
        }else{
            contextObj.setComponentMountToggler(c => ({...c, actionContent: contextObj.previousComponentRef.current.actionContent, toolKit: contextObj.previousComponentRef.current.toolKit}));
        };
    };

    return(
        <section className={contextObj.modeState === 'light'? styles.containerLight : styles.containerDark} id={styles.container}>
        
            <button disabled={contextObj.componentMountToggler.actionContent === 'help'} className={styles.btnHover} style={contextObj.componentMountToggler.toolKit === 'home' ? activeStyle : {}}
                    onClick={() => handleHomeClick()}>
                Home
            </button>
    

            <button disabled={(contextObj.componentMountToggler.actionContent === 'create') && (contextObj.componentMountToggler.toolKit === 'home' || contextObj.componentMountToggler.toolKit === 'insert')} className={styles.btnHover} style={contextObj.componentMountToggler.actionContent === 'create' &&  contextObj.componentMountToggler.toolKit === ''? activeStyle : {}}
                    onClick={() => handleCreateClick()}>
                Create
            </button>


            <button disabled={true} className={styles.btnHover} style={contextObj.componentMountToggler.actionContent === 'read' &&  contextObj.componentMountToggler.toolKit === ''? activeStyle : {}} 
                    onClick={() =>  handleViewClick()}>
                View
            </button>
            
            <button  className={styles.btnHover} style={contextObj.componentMountToggler.actionContent === 'review' ? activeStyle : {}} 
                    onClick={() => handleReviewClick()}>
                Review
            </button>
        

            <button className={styles.btnHover} style={contextObj.componentMountToggler.actionContent === 'help' ? activeStyle : {}} 
                        onClick={() => handleHelpClick()}>
                Help
            </button>
        </section>
    );
};