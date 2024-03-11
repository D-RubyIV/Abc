import { Fragment, useEffect, useState } from "react";
import instance from "../../Api/CustomAxios.jsx"
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
    XCircleIcon,
} from '@heroicons/react/24/outline'

const BlockModalDelete = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-lg shadow-xl bg-white w-10/12 lg:w-8/12 md:w-8/12">
            <div className="flex flex-col items-center justify-center p-4">
                <p className="mb-4">Bạn có chắc chắn muốn xóa không?</p>
                <div className="flex space-x-4">
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Xác nhận
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>

    );
};

const BlockModalEdit = ({ setOpenBlockEditBool, visible, objectSelected, handleInputChange, handleUpdateBtn }) => {
    if (!visible || !objectSelected) return null;
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-lg shadow-xl bg-white w-10/12 lg:w-8/12 md:w-8/12">
            <div className="">
                {/* Header */}
                <div className="flex justify-between">
                    <h5 className="font-bold">Edit</h5>
                    <button onClick={() => setOpenBlockEditBool(false)}>
                        <XCircleIcon className="h-5 w-5 flex-none text-gray-400 hover:text-red-400" aria-hidden="true"></XCircleIcon>
                    </button>
                </div>
                <form onSubmit={handleUpdateBtn}>
                    <div className="mt-2">
                        <div>
                            <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Id</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="id"
                                    autoComplete="off"
                                    value={objectSelected.id || ''}
                                    onChange={handleInputChange}
                                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    autoComplete="off"
                                    value={objectSelected.name || ''}
                                    onChange={handleInputChange}
                                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Code</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="code"
                                    autoComplete="off"
                                    value={objectSelected.code || ''}
                                    onChange={handleInputChange}
                                    required
                                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-blue-600 p-1 rounded mt-3 text-sm">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

const BlockModalView = ({ setOpenBlockViewBool, visible, objectSelected }) => {
    if (!visible || !objectSelected) return null;
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-lg shadow-xl bg-white w-10/12 lg:w-8/12 md:w-8/12">
            <div className="">
                {/* Header */}
                <div className="flex justify-between">
                    <h5 className="font-bold">View</h5>
                    <button onClick={() => setOpenBlockViewBool(false)}>
                        <XCircleIcon className="h-5 w-5 flex-none text-gray-400 hover:text-red-400" aria-hidden="true"></XCircleIcon>
                    </button>
                </div>
                <div className="mt-2">
                    <div>
                        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Id</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                value={objectSelected.id || ''}
                                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                disabled
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                value={objectSelected.name || ''}
                                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                disabled
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Code</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                value={objectSelected.code || ''}
                                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
    const [openBlockDelete, setOpenBlockDelete] = useState(false)
    const [openBlockViewBool, setOpenBlockViewBool] = useState(false)
    const [openBlockEditBool, setOpenBlockEditBool] = useState(false)
    const [arrayClassObj, setArrayClassObj] = useState([])
    const [objectSelected, setObjectSelected] = useState({})

    const handleInputChange = (e) => {
        e.preventDefault();
        setObjectSelected({ ...objectSelected, [e.target.name]: e.target.value });
        console.log(objectSelected)
    };
    const findAll = () => {
        instance.get("/api/class").then(function (response) {
            setArrayClassObj(response.data.data);
        })
    }
    useEffect(() => {
        findAll();
    }, [])

    const handleDetail = (id) => {
        console.log(id)
        instance.get(`/api/class/${id}`).then(function (response) {
            setObjectSelected(response.data.data);
        })
        setOpenBlockViewBool(true);
    }
    const handleDelete = () => {
        setOpenBlockDelete(true);
    };
    const handleUpdate = (id) => {
        console.log(id)
        instance.get(`/api/class/${id}`).then(function (response) {
            setObjectSelected(response.data.data);
        })
        setOpenBlockEditBool(true);
    }
    const handleUpdateBtn = () => {
        instance.put(`/api/class/${objectSelected.id}`, objectSelected).then(function (response) {
            setObjectSelected(response.data.data);
            console.log(response.status)
            if (response.status == 200) {
                findAll();
            }
        })
        setOpenBlockEditBool(false);
    }

    const BlockActionButton = (props) => {
        return (
            <div>
                <button className="px-4" onClick={(e) => handleDetail(props.idObject)}>
                    <EyeIcon className="h-5 w-5 flex-none text-gray-400 hover:text-blue-400" aria-hidden="true"></EyeIcon>
                </button>
                <button className="px-4" onClick={(e) => handleUpdate(props.idObject)}>
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
            <h1 className="text-xl mb-2">Your orders</h1>
            {/* <h2>{import.meta.env.VITE_REACT_APP_API_URL}</h2> */}
            {/* WINDOWN */}
            <div className="overflow-auto rounded-lg shadow hidden md:block">
                <table className="w-full table-auto">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="text-center p-3 text-sm font-semibold tracking-wide">No.</th>
                            <th className="text-center p-3 text-sm font-semibold tracking-wide">Name</th>
                            <th className="text-center p-3 text-sm font-semibold tracking-wide">Status</th>
                            <th className="text-center p-3 text-sm font-semibold tracking-wide">Code</th>
                            <th className="text-center p-3 text-sm font-semibold tracking-wide">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {
                            arrayClassObj.map((item, index) => {
                                return (
                                    <tr className="bg-white text-center" key={index}>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <a href="#" className="font-bold text-blue-500 hover:underline">{item.id}</a>
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            {item.name}
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span
                                                className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Delivered</span>
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{item.code}</td>
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
                    arrayClassObj.map((item, index) => {
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
            <BlockModalView setOpenBlockViewBool={setOpenBlockViewBool} visible={openBlockViewBool} objectSelected={objectSelected} />
            <BlockModalEdit setOpenBlockEditBool={setOpenBlockEditBool} visible={openBlockEditBool} objectSelected={objectSelected} handleInputChange={handleInputChange} handleUpdateBtn={handleUpdateBtn} />
            <BlockModalDelete isOpen={openBlockDelete} onCancel={() => setOpenBlockDelete(false)} onConfirm={handleDelete} />
        </div>
    )
}