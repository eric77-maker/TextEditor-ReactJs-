import styles from './SideBar.module.css';
import trashImgLight from '/src/assets/SideBarImgs/trashImgLight.svg';
import trashImgDark from '/src/assets/SideBarImgs/trashImgDark.png';
import htmlFileImgLight from '/src/assets/SideBarImgs/htmlFileLight.png';
import htmlFileImgDark from '/src/assets/SideBarImgs/htmlFileDark.png';
import { useContext, useEffect } from 'react';
import {motion} from 'framer-motion'
import { ContextObj } from '../../TextEditor/TextEditor';




export default function SideBar(props){
    const contextObj = useContext(ContextObj);

    const filesDivAnim = {
        maxHeight: ['75vh', '70vh']
    };
    
    const animate = {
        fontSize: ['2px', '2px', '10px', '12px'],
        height: ['5px', '30px'],
        opacity: [0, 1],
    };

    useEffect(() => {
        console.log('re-rendered Sidebar...')
    }, []);

    const readFileHandler = file =>{
        if(!contextObj.madeChangesRef.current){
            if(props.readFileRef.current !== null){
                if(contextObj.componentMountToggler.actionContent === 'read'){
                    if(props.readFileRef.current.fileName !== file.fileName){
                        props.readFileRef.current = file;
                        props.fileToEditRef.current = file;
                        contextObj.setFileName(f => ({...f, fileName: file.fileName}));
                        contextObj.createEditContentRef.current = {from: '', content: ''};
                    }else{  
                        window.alert('that is the current file you are reading!');
                    };
                };
    
                if(contextObj.componentMountToggler.actionContent === 'edit'){
                    if(props.readFileRef.current.fileName !== file.fileName){
                        props.readFileRef.current = file;
                        props.fileToEditRef.current = file;
                        contextObj.setFileName(f => ({...f, fileName: file.fileName}));
                        contextObj.componentMountToggler.actionContent !== 'read' && contextObj.setComponentMountToggler(c => ({...c, actionContent: 'read'}));
                    }else{
                        contextObj.componentMountToggler.actionContent !== 'read' && contextObj.setComponentMountToggler(c => ({...c, actionContent: 'read'}));
                    };

                    contextObj.createEditContentRef.current = {from: '', content: ''}; 
                };
            }else{
                props.readFileRef.current = file;
                props.fileToEditRef.current = file;
                contextObj.setFileName(f => ({...f, fileName: file.fileName}));
                contextObj.createEditContentRef.current = {from: '', content: ''};  
                contextObj.componentMountToggler.actionContent !== 'read' && contextObj.setComponentMountToggler(c => ({...c, actionContent: 'read'}));
            };
        }else{
            contextObj.storeFileTempRef.current = {...contextObj.storeFileTempRef.current, file };
/*             if(contextObj.lastCurrentPageRef.current > 1 && contextObj.lastCurrentPageRef.current !== contextObj.fileToEditRef.current.editLastCurrentPage){
                contextObj.storeFileTempRef.current = {...contextObj.storeFileTempRef.current, file , hasEditLastCurrentPage: true};
            }else{
                contextObj.storeFileTempRef.current = {...contextObj.storeFileTempRef.current, file , hasEditLastCurrentPage: false};
            };     */
            
            
            if(contextObj.wasGoingToAfterEditRef.current !== 'read'){
                contextObj.wasGoingToAfterEditRef.current = 'read';
            };
            !contextObj.promptWithoutSavingChangesOnEdit && contextObj.setPromptWithoutSavingChangesOnEdit(true);
        };
    };

    const removeFileFromStore = (id, fileName) =>{
        if(contextObj.readFileRef.current !== null){
            if(contextObj.readFileRef.current.fileName === fileName){
                contextObj.setComponentMountToggler(c => ({...c, actionContent: 'create'}));
            };
        };

        const newRecentFiles = contextObj.recentFiles.filter((file, index) =>{
            if(!(file.fileName === fileName)){
                return file;
            };
        });



        contextObj.setRecentFiles(newRecentFiles);
    };

    const showFullFileNameHandler = index =>{
        if(contextObj.recentFiles.length > 1){
            document.getElementById(index + 1).style.display = 'flex';
        };
    };

    const hideFullFileNameHandler = index =>{
        if(contextObj.recentFiles.length  > 1){
            document.getElementById(index + 1).style.display = 'none';
        }
    };

    return(
        <section id={styles.container} className={contextObj.modeState === 'light'? styles.containerLight: styles.containerDark}>
            <div className={styles.header}>
                <p className={contextObj.modeState === 'light'? styles.titleLight : styles.titleDark}>
                    Recent Files
                </p>
                <button>+</button>
            </div>

        <motion.div animate={contextObj.componentMountToggler.toolKit === 'home' ? filesDivAnim : {}} duration={{duration: 0.2}} style={{maxHeight: contextObj.componentMountToggler.toolKit === 'home' ? '70vh' : '75vh'}} id={styles.filesDiv}>
                {contextObj.recentFiles.length > 0 && contextObj.recentFiles.map((file, index) =>(
                    <span style={{position: 'relative'}} key={index}>
                        <div id={styles.textImgDiv}>
                            <img src={contextObj.modeState === 'light'? htmlFileImgLight : htmlFileImgDark} alt="" width={16} height={13}/>
                            {file.fileName.length < 15 && <p style={{cursor: 'pointer'}}  onClick={() => readFileHandler(file)}>{file.fileName}</p>}
                            {file.fileName.length >= 15 && <p style={{cursor: 'pointer'}} onMouseLeave={() => hideFullFileNameHandler(index)} onMouseEnter={() => showFullFileNameHandler(index)}  onClick={() => readFileHandler(file)}>{file.fileName.slice(0, 15)}...</p>}
                        </div>
                        {file.fileName.length >= 15 && contextObj.recentFiles.length > 1 && index < contextObj.recentFiles.length - 1 && <p id={index + 1} className={styles.fullFileNameToolkit}>...{file.fileName.slice(15, )}</p>}
                        {file.fileName.length >= 15 && contextObj.recentFiles.length > 1 && index >= contextObj.recentFiles.length - 1 && <p id={index + 1} className={styles.lastFullFileNameToolkit}>...{file.fileName.slice(15, )}</p>}
                        <button style={{display: 'grid', placeContent: 'center', marginTop: '2px'}} onClick={() => removeFileFromStore(file.id, file.fileName)}>
                            <img src={contextObj.modeState === 'light'? trashImgLight : trashImgDark} alt="" width={10} height={10}/>
                        </button>
                    </span>
                ))}
                {contextObj.recentFiles.length < 1 && <p id={styles.noFiles} className={contextObj.modeState === 'light'? styles.noFilesLight : styles.noFilesDark}>No Recent File</p>}
            </motion.div>
            {contextObj.componentMountToggler.toolKit === 'home' && 
                <motion.div animate={animate} transition={{duration: 0.4}} className={styles.addToRecentOnHomeToolKit}>
                    <button>+</button>
                </motion.div>
            }
        </section>
    );
};