import { Fragment, useEffect, useState, useRef } from "react";
import instance from "../../Api/CustomAxios.jsx"
import ClipboardJS from 'clipboard';
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
    LockClosedIcon,
    DocumentDuplicateIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline'

const BlockModalUpdate = ({ setOpenBlockUpdate, openBlockUpdate, selectedObject, setSelectedObject, handleInputChange, handleSubmitUpdate }) => {
    const [arrayClassObject, setArrayClassObject] = useState([])
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
        const year = date.getFullYear();
        const formattedDate = `${year}/${month}/${day}`;
        return formattedDate;
    }


    const onChangeEnable = (e) => {
        const boolString = e.target.value
        var enableStatus = false
        if (boolString == "true"){
            enableStatus = true;
        }
   
        console.log("Obj: ", enableStatus)
        setSelectedObject({...selectedObject, enable: enableStatus})
        console.log("AFTER CHANGE: ", selectedObject)
    }

    const onChangeClass = (e) => {
        const selectedId = e.target.value
        console.log("SELECTED ID: ", selectedId)
        const selectClass = arrayClassObject.filter((d) => d.id == selectedId)[0];
        console.log("Obj: ", selectClass)
        setSelectedObject({...selectedObject, classDomain: selectClass})
        console.log("AFTER CHANGE: ", selectedObject)

    }
    useEffect(() => {
        instance.get("/api/class").then(function (response) {
            setArrayClassObject(response.data.data);
            console.log(arrayClassObject)
        })
    }, [])


    if (!openBlockUpdate || !selectedObject) return null;
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-lg shadow-xl bg-white w-10/12 lg:w-8/12 md:w-8/12">
            <div className="">
                {/* Header */}
                <div className="flex justify-between">
                    <h5 className="font-bold">View</h5>
                    <button onClick={() => setOpenBlockUpdate(false)}>
                        <XCircleIcon className="h-5 w-5 flex-none text-gray-400 hover:text-red-400" aria-hidden="true"></XCircleIcon>
                    </button>
                </div>
                <form >
                    <div className="mt-2  overflow-auto max-h-96">
                        <div>
                            <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Id</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="id"
                                    autoComplete="off"
                                    value={selectedObject.id || ''}
                                    onChange={handleInputChange}
                                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-2  overflow-auto max-h-96">
                        <div>
                            <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">License</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="licenseKey"
                                    autoComplete="off"
                                    value={selectedObject.licenseKey || ''}
                                    onChange={handleInputChange}
                                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-2  overflow-auto max-h-96">
                        <div>
                            <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Registration Time</label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="registrationTime"
                                    autoComplete="off"
                                    // value={formatTimestamp(selectedObject.registrationTime)}
                                    value={selectedObject.registrationTime || ""}
                                    onChange={handleInputChange}
                                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-2  overflow-auto max-h-96">
                        <div>
                            <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Expiration Time</label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="expirationTime"
                                    autoComplete="off"
                                    // value={selectedObject.expirationTime}
                                    value={selectedObject.expirationTime || ""}
                                    onChange={handleInputChange}
                                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-2  overflow-auto max-h-96">
                        <div>
                            <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Class</label>
                            <div className="mt-2">
                                {selectedObject.classDomain && (
                                    <select
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        id=""
                                        autoComplete="off"
                                        value={selectedObject.classDomain.id || ""}
                                        onChange={onChangeClass}
                                    >
                                        {/* Map through the arrayClassObject and create an <option> for each item */}
                                        {arrayClassObject.map((item, index) => (
                                            <option key={index} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-2  overflow-auto max-h-96">
                        <div>
                            <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Enable</label>
                            <div className="mt-2">
                                <select
                                    name="enable"
                                    id=""
                                    onChange={onChangeEnable}
                                    className="px-3 uppercase block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={String(selectedObject.enable )|| ""}
                                >
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <button onClick={handleSubmitUpdate} type="button" className="w-full bg-blue-600 p-1 rounded mt-3 text-sm">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


const BlockModalDetail = ({ setOpenBlockDetail, openBlockDetail, selectedObject }) => {
    const [arrayClassObject, setArrayClassObject] = useState([])
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
        const year = date.getFullYear();

        const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;

        return formattedDate;
    }
    useEffect(() => {
        instance.get("/api/class").then(function (response) {
            setArrayClassObject(response.data.data);
        })
    }, [])


    if (!openBlockDetail || !selectedObject) return null;
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-lg shadow-xl bg-white w-10/12 lg:w-8/12 md:w-8/12">
            <div className="">
                {/* Header */}
                <div className="flex justify-between">
                    <h5 className="font-bold">View</h5>
                    <button onClick={() => setOpenBlockDetail(false)}>
                        <XCircleIcon className="h-5 w-5 flex-none text-gray-400 hover:text-red-400" aria-hidden="true"></XCircleIcon>
                    </button>
                </div>
                <div className="mt-2  overflow-auto max-h-96">
                    <div>
                        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Id</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                value={selectedObject.id || ''}
                                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                disabled
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-2  overflow-auto max-h-96">
                    <div>
                        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">License</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                value={selectedObject.licenseKey || ''}
                                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                disabled
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-2  overflow-auto max-h-96">
                    <div>
                        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Registration Time</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                // value={formatTimestamp(selectedObject.registrationTime)}
                                value={selectedObject.registrationTime ? formatTimestamp(selectedObject.registrationTime) : ""}
                                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                disabled
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-2  overflow-auto max-h-96">
                    <div>
                        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Expiration Time</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                // value={formatTimestamp(selectedObject.expirationTime)}
                                value={selectedObject.expirationTime ? formatTimestamp(selectedObject.expirationTime) : ""}
                                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                disabled
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-2  overflow-auto max-h-96">
                    <div>
                        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Class</label>
                        <div className="mt-2">
                            {selectedObject.classDomain && (
                                <select
                                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    name="" id="" value={selectedObject.classDomain} disabled
                                >
                                    {arrayClassObject.map((item, index) => (
                                        <option key={index}>{item.name}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-2  overflow-auto max-h-96">
                    <div>
                        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Enable</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                value={selectedObject.enable || ""}
                                className="px-3 uppercase block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}





export default function Example() {
    const [arrayObject, setArrayObject] = useState([])
    const [selectedObject, setSelectedObject] = useState({})
    const myFocus = useRef()

    const [openBlockDetail, setOpenBlockDetail] = useState(false)
    const [openBlockDelete, setOpenBlockDelete] = useState(false)
    const [openBlockUpdate, setOpenBlockUpdate] = useState(false)

    useEffect(() => {
        console.log("EF: ", selectedObject)
    }, [selectedObject])

    useEffect(() => {
        reloadArrayObject();
    }, [])


    const handleInputChange = (e) => {
        e.preventDefault();
        setSelectedObject({ ...selectedObject, [e.target.name]: e.target.value });
    };


    const truncatedText = (longText) => {
        const maxLength = 30; // Số ký tự tối đa
        const truncatedText = longText.length > maxLength
            ? `${longText.substring(0, maxLength)}...`
            : longText;
        return truncatedText;
    }

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
        const year = date.getFullYear();

        const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;

        return formattedDate;
    }

    const SetCloseAllModalAction = () => {
        setOpenBlockDetail(false)
        setOpenBlockDelete(false)
        setOpenBlockUpdate(false)
    }

    const handleCopyClick = (e) => {
        const clipboard = new ClipboardJS('.copy-button', {
            text: () => e.target.getAttribute('data-value')
        });
        clipboard.on('success', (e) => {
            console.log('Text copied:', e.text);
            clipboard.destroy(); // Cleanup
        });
    };

    const handleDetail = (id) => {
        SetCloseAllModalAction();
        instance.get(`/api/license/${id}`).then(function (response) {
            setSelectedObject(response.data.data);
        })
        setOpenBlockDetail(true);
    }
    const handleUpdate = (id) => {
        SetCloseAllModalAction();
        instance.get(`/api/license/${id}`).then(function (response) {
            setSelectedObject(response.data.data);
        })
        setOpenBlockUpdate(true);
    }
    const handleSubmitUpdate = () => {
        console.log("DATA UPDATE: ", selectedObject)
        instance.put(`/api/license/${selectedObject.id}`, selectedObject).then(function (response) {
            setSelectedObject(response.data.data);
            if (response.status == 200) {
                reloadArrayObject();
                setOpenBlockUpdate(false);
            }
        })
    }

    const reloadArrayObject = () => {
        instance.get("/api/license").then(function (response) {
            setArrayObject(response.data.data);
        })
    }

    const BlockActionButton = ({ idObject }) => {
        return (
            <div className="flex">
                <button className="px-4" onClick={(e) => handleDetail(idObject)}>
                    <EyeIcon className="h-5 w-5 flex-none text-gray-400 hover:text-blue-400" aria-hidden="true"></EyeIcon>
                </button>
                <button className="px-4" onClick={(e) => handleUpdate(idObject)}>
                    <PencilIcon className="h-5 w-5 flex-none text-gray-400 hover:text-blue-400" aria-hidden="true"></PencilIcon>
                </button>
                <button className="px-4" onClick={(e) => handleDelete()}>
                    <TrashIcon className="h-5 w-5 flex-none text-gray-400 hover:text-blue-400" aria-hidden="true"></TrashIcon>
                </button>
            </div>
        )
    }



    return (
        <div className="">
            <h1 className="text-xl mb-2">Your License</h1>
            {/* <h2>{import.meta.env.VITE_REACT_APP_API_URL}</h2> */}
            {/* WINDOWN */}
            <div className="overflow-auto rounded-lg shadow hidden md:block">
                <table className="w-full table-auto">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="text-center p-3 text-sm font-semibold tracking-wide">No.</th>
                            <th className="w-32 text-center p-3 text-sm font-semibold tracking-wide" >Key</th>
                            <th className="text-center p-3 text-sm font-semibold tracking-wide">Class</th>
                            <th className="text-center p-3 text-sm font-semibold tracking-wide">Registration</th>
                            <th className="text-center p-3 text-sm font-semibold tracking-wide">Expiration</th>
                            <th className="text-center p-3 text-sm font-semibold tracking-wide">Enable</th>
                            <th className="w-40 text-center p-3 text-sm font-semibold tracking-wide">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {
                            arrayObject.map((item, index) => {
                                return (
                                    <tr className="bg-white text-center" key={index}>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <a href="#" className="font-bold text-blue-500 hover:underline">{item.id}</a>
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap"  >
                                            <div className="flex justify-between" >
                                                <p>{truncatedText(item.licenseKey)}</p>
                                                <button onClick={handleCopyClick} className="h-5 w-5 flex-none text-gray-400 hover:text-blue-400 copy-button"><DocumentDuplicateIcon data-value={item.licenseKey}/></button>
                                            </div>
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            {item.classDomain.name}
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            {formatTimestamp(item.registrationTime)}
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            {formatTimestamp(item.expirationTime)}
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span
                                                className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{item.enable.toString()}
                                            </span>
                                        </td>
                                        <td className="">
                                            <BlockActionButton idObject={item.id} />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {/* MOBILE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {
                    arrayObject.map((item, index) => {
                        return (
                            <div className="bg-white space-y-3 p-4 rounded-lg shadow" key={index}>
                                <div className="flex items-center space-x-2 text-sm">
                                    <div>
                                        <a href="#" className="text-blue-500 font-bold hover:underline">{item.id}</a>
                                    </div>
                                    <div className="text-gray-500">{item.name}</div>
                                    <div>
                                        <span
                                            className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Delivered</span>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-700">
                                    Kring New Fit office chair, mesh + PU, black
                                </div>
                                <div className="text-sm font-medium text-black">
                                    $200.00
                                </div>
                                <BlockActionButton idObject={item.id} />
                            </div>
                        )
                    })
                }
            </div>
            {/*  */}
            <BlockModalDetail setOpenBlockDetail={setOpenBlockDetail} openBlockDetail={openBlockDetail} selectedObject={selectedObject} />
            <BlockModalUpdate setOpenBlockUpdate={setOpenBlockUpdate} openBlockUpdate={openBlockUpdate} selectedObject={selectedObject} setSelectedObject={setSelectedObject} handleInputChange={handleInputChange} handleSubmitUpdate={handleSubmitUpdate} />
        </div>
    )
}