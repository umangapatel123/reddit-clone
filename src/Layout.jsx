import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header/Header";
import authService from "./appwrite/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";

function Layout() {

    const [loading,setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        authService.getCurrentUser().then((res) => {
            if(res){
                dispatch(login(res))
            }
            else
            {
                dispatch(logout())
            }
        }
        ).finally(() => {
            setLoading(false)
        })
    },[])

    // return (
    //     <div>
    //     <Header />
    //     <Outlet />
    //     </div>
    // );
    return (
        <>
        {!loading && (
            <div>
            <Header />
            <Outlet />
            </div>
        )}
        </>
    )
}

export default Layout;