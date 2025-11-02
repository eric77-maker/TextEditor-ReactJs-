import styles from './Input.module.css';
import { useRef, useEffect } from 'react';





export default function Input(props){
    const textInputRef = useRef(null);
    const reActiveIdleTokenRef = useRef(null);

    useEffect(() =>{
        textInputRef.current.focus();
    }, []);


     useEffect(() =>{
        reActiveIdleTokenRef.current = () =>{
            props.setLinkCompStates(l => ({...l, idleToken: null, reMountIdleToken: l.reMountIdleToken == 'on' ? 'off' : 'on'}));
        };

    }, []); 

    useEffect(() =>{
        const debounceInsertLink = (fn, wait) =>{
            let token;

            return e =>{

                if(token){
                    clearTimeout(token);
                };

                token = setTimeout(() => fn(e), wait)

                props.setLinkCompStates(l => ({...l, reMountIdleToken: l.reMountIdleToken == 'on' ? 'off' : 'on'}));
            }
        };

        const storeLink = e =>{
            if((e.target.value.startsWith('http://') || e.target.value.startsWith('https://')) && e.target.value.length >= 15 ){
                props.linkRef.current = e.target.value;
                props.setLinkCompStates(l =>({...l, checkLinkStatus: 'insert'}));
            }else if(e.target.value == ''){
                props.setLinkCompStates(l =>({...l, checkLinkStatus: 'empty'}));
            }else{
                props.setLinkCompStates(l =>({...l, checkLinkStatus: 'notLink)'}));
            };
        };



        textInputRef.current.addEventListener('keyup', debounceInsertLink(storeLink, 1000))

        return () =>{
            textInputRef.current && textInputRef.current.removeEventListener('keyup', debounceInsertLink)
        }
    }, []);



    return(
        <input id='textInput' className={styles.textInput} ref={textInputRef}  type="text" placeholder='type link here!'/>
    );
}