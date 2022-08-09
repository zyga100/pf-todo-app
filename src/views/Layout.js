import { Outlet } from "react-router-dom";
import React from "react";
import NavBarReLog from "./NavBars/NavBarReLog/NavBarReLog"


const Layout = () => {
    return(
        <>
        <main>
            <NavBarReLog/>
            <Outlet/>
        </main>
        </>
    )
}


export default Layout 