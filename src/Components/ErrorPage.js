import React from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {

    const navigate = useNavigate();

    return (
        <div className='w-full h-screen flex items-center justify-center flex-col gap-4 bg-white dark:bg-slate-900'>
            <h1 className='text-4xl font-black lg:text-7xl text-slate-500 dark:text-slate-400'>404</h1>
            <h1 className=' text-sm text-sm lg:text-base text-slate-500 dark:text-slate-600'>Page not found</h1>
            <button type="button" className="text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-4 py-2 text-center hover:shadow-xl transition-all" onClick={() => navigate('/')}>Back to home</button>
        </div>
    )
}

export default ErrorPage
