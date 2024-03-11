import { Outlet } from "react-router-dom";

export default function Example() {
    return (
        <div className="p-2 h-screen bg-gray-100">
            <div className="p-5 h-screen bg-gray-100">
                <Outlet></Outlet>
            </div>
        </div>
    )
}