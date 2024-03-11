import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Headers from "./Navbar/Headers"
export default function Example() {
    return (
        <Fragment>
            <Headers></Headers>
            <Outlet></Outlet>
        </Fragment>
    )
}