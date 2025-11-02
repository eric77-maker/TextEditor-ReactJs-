import styles from './Link.module.css';
import linkImg from '/src/assets/InsertToolKitImgs/link.png';
import insertLinkImg from '/src/assets/InsertToolKitImgs/insertLink.png';
import notALinkImg from '/src/assets/searchCoverImgs/cancel.png';
import { useState ,useRef ,useEffect ,useContext } from 'react';
import { ContextObj } from '../../../../../TextEditor/TextEditor';
import Input from './Input/Input';



export default function Link(){
    const contextObj = useContext(ContextObj);
    const [linkCompStates, setLinkCompStates] = useState({
        checkLinkStatus: '', hideLinkInput: 'hide', idleToken: null, reMountIdleToken: 'on'
    });
    const linkRef = useRef('');

    useEffect(() =>{
        if(linkCompStates.idleToken){
            clearTimeout(linkCompStates.idleToken)
            setLinkCompStates(l => ({...l, idleToken: null}));
        };

        if(linkCompStates.hideLinkInput === 'show' && linkCompStates.idleToken === null){

            const hideInputOnIdle = () =>{
                linkRef.current = '';
                setLinkCompStates(l =>({...l, checkLinkStatus: '', hideLinkInput: 'hide', idleToken: null}));
            };

            const token = setTimeout(() =>hideInputOnIdle(), 5000);
    
            setLinkCompStates(l => ({...l, idleToken: token}));
        };


        return () => {
            clearTimeout(linkCompStates.idleToken);
        };
    }, [linkCompStates.reMountIdleToken])

    const insertLinkHandler = () =>{

        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('CreateLink', false, linkRef.current);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('CreateLink', false, linkRef.current);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };

        linkRef.current = '';
        setLinkCompStates(l =>({...l, checkLinkStatus: '', hideLinkInput: 'hide', idleToken: null}));
    };


    const showLinkInputHandler = () => {
        setLinkCompStates(l => ({...l, hideLinkInput: 'show', reMountIdleToken: l.reMountIdleToken == 'on' ? 'off' : 'on'}));
    };


    return(
        <div className={styles.container}>
            <button className={styles.btn} onClick={() =>showLinkInputHandler()}>
        
            {linkCompStates.hideLinkInput === 'show' && <Input linkRef={linkRef} setLinkCompStates={setLinkCompStates}  />
            }

            {linkCompStates.checkLinkStatus === 'insert' &&
                <span id={styles.linkBtn} onClick={() =>insertLinkHandler()}>
                    <img src={insertLinkImg} alt="" className={styles.insertLinkImg}/>
                </span>
            }
            {linkCompStates.checkLinkStatus === 'notLink' && 
                <span id={styles.linkBtn}>
                    <img src={notALinkImg} alt="" className={styles.notLinkImg}/>
                </span> 
            }
                <img src={linkImg} alt="" width={20} height={20}/>
            </button>
            
            <p className={contextObj.modeState === 'light'? styles.textLight : styles.textDark}>
                link
            </p>
        </div>
    );
};