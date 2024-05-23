import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TbFiles } from "react-icons/tb";

function Navbar() {

    const navigate = useNavigate();

    return (
        <header className="bg-[#fffff000] dark:bg-[#0f172a99] backdrop-blur-xl fixed w-full z-[999]">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* <div className="md:flex md:items-center md:gap-12"> */}
                        <div className="block tracking-tight text-slate-700 cursor-pointer text-xl font-bold dark:text-slate-200" onClick={() => navigate('/')}>
                            ByteStream
                        </div>
                    {/* </div> */}
                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            <div
                                className=" bg-slate-700 cursor-pointer dark:bg-slate-700 text-white p-2 text-xl rounded-lg hover:bg-slate-900 focus:ring-slate-400 dark:hover:bg-slate-800 focus:ring-4 dark:focus:ring-slate-600 transition-all"
                                onClick={() => navigate('/files')}
                            >
                                <TbFiles />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Navbar
