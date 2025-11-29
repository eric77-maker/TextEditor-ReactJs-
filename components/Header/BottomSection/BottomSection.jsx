import styles from './BottomSection.module.css';
import { useContext } from 'react';
import { ContextObj } from '../../TextEditor/TextEditor';

export default function BottomSection(props){
    const contextObj = useContext(ContextObj);
    const activeStyle = {
        backgroundColor: 'hsl(0, 0%, 80%)',
        color: '#fff',
        minWidth: '70px',
        height: '100%',
        padding: '0 0.5vw'
    };
 
    const handleHomeClick = () =>{
        if(contextObj.componentMountToggler.toolKit !== 'home'){//  renders the home toolkit when not mounted.
            contextObj.setComponentMountToggler(c => ({...c, toolKit: 'home'}));
        }else{// unmounts the home toolkit when it is mounted.
            contextObj.setComponentMountToggler(c => ({...c, toolKit: '', autofocus: c.autofocus + 1}));
        }
    };


    //takes a user to the create text board.
    const handleCreateClick = () =>{
        if(contextObj.fromRef.current === 'read' && contextObj.lastCurrentPageRef.current !== null){
            let editedFile;
    
            const updatedFileStore = contextObj.filesStoreRef.current.map(file => {
                if(file.fileName === contextObj.readFileRef.current.fileName){
                    editedFile = {...file, readLastCurrentPage: contextObj.lastCurrentPageRef.current};
                    return editedFile;
                };
                
                    return file;
                });
                
            const updatedRecentFiles = contextObj.recentFiles.map(file =>{
                if(file.fileName === contextObj.readFileRef.current.fileName){
                    return editedFile;
                };
                
                    return file;
            });

            
            contextObj.filesStoreRef.current = updatedFileStore;
            contextObj.setRecentFiles(updatedRecentFiles);
        };

        if(!contextObj.madeChangesRef.current){
            if(contextObj.componentMountToggler.actionContent !== 'create'){
                if(window.frames['textToPrint'] && window.frames['textToPrint'].document.body.innerHTML.length > 0){
                    window.frames['textToPrint'].document.body.innerHTML = '';
                };
                contextObj.setComponentMountToggler(c => ({...c, actionContent: 'create'}));
                contextObj.createEditContentRef.current.from == {from : 'create', content: ''}
            }
        }else{
            if(contextObj.wasGoingToAfterEditRef.current !== 'create'){
                contextObj.wasGoingToAfterEditRef.current = 'create';
            };
            !contextObj.showPromptToSaveChanges && contextObj.setPromptWithoutSavingChangesOnEdit(true);
        };

        if(contextObj.fromRef.current === 'read'){
            contextObj.readFileRef.current = null;
            contextObj.fileToEditRef.current = null;
            contextObj.createEditContentRef.current = {from: '', content: ''};
            contextObj.lastCurrentPageRef.current = null;
        };

        contextObj.fromRef.current = '';
    };

    //takes a user to the review text board to review a text that is being created or edited.
    const handleReviewClick = () =>{ //takes a user to review text board.
        if(contextObj.componentMountToggler.actionContent !== 'review'){
            contextObj.previousComponentRef.current = {actionContent: contextObj.componentMountToggler.actionContent, toolKit: contextObj.componentMountToggler.toolKit};
            contextObj.setComponentMountToggler(c => ({...c, actionContent: 'review', toolKit: ''}));
        }else{ //takes a user to previous board board when the current board is review text.
            contextObj.setComponentMountToggler(c => ({...c, actionContent: contextObj.previousComponentRef.current.actionContent, toolKit: contextObj.previousComponentRef.current.toolKit}));
        }
    };


    const handleHelpClick = () =>{
        if(contextObj.componentMountToggler.actionContent !== 'help'){//takes a user to the help board.
            contextObj.previousComponentRef.current = {actionContent: contextObj.componentMountToggler.actionContent, toolKit: contextObj.componentMountToggler.toolKit};
            contextObj.setComponentMountToggler(c => ({...c, actionContent: 'help', toolKit: ''}));
        }else{ //takes a user to the previous board when the current board is help.
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


            <button disabled={true} className={styles.btnHover} style={contextObj.componentMountToggler.actionContent === 'read' &&  contextObj.componentMountToggler.toolKit === ''? activeStyle : {}}>
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