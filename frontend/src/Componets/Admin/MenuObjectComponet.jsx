import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
export default function MenuObjectComponet() {
    const [arrayObject, setArrayObject] = useState([
        {
            "name": "User",
            "href": "./users"
        },
        {
            "name": "License",
            "href": "./license"
        },
        {
            "name": "Class",
            "href": "./class"
        }
    ])

    return (
        <div>
            
            <div className="overflow-auto rounded-lg shadow hidden md:block">
               
                <table className="w-full ">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">No.</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Code</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Link</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Status</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {
                            arrayObject.map((item, index) => {
                                return (
                                    <tr className="bg-white" key={index}>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <p className="font-semibold text-blue-500 hover:underline">#{index + 1}</p>
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <p href="#" className="font-bold text-gray-500 hover:underline">{item.name}</p>
                                        </td>
                                        <td className="p-3 text-sm  whitespace-nowrap ">
                                            <Link to={item.href} className="font-semibold text-blue-500 underline">Go To</Link>
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span
                                                className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Delivered
                                            </span>
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{item.name}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}