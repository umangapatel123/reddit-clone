import React,{useEffect,useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function Protected({children,authentication=false}) {
    const navigate = useNavigate();
    const authStatus = useSelector(state=>state.auth.status);

    const [loding,setLoding] = useState(true);
    useEffect(()=>{

        if(authentication && authStatus!=authentication){
            navigate("/login");
        }
        else if(!authentication && authStatus!=authentication){
            navigate("/");
        }
        setLoding(false);
    },[authStatus,navigate,authentication]);

    return loding ? <div>loding...</div> : <>{children}</>;

}