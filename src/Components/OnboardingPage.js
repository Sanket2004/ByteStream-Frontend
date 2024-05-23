import React from 'react'
import { useNavigate } from 'react-router-dom'

function OnboardingPage() {

    const navigate = useNavigate();

    return (
        <section className="dark:bg-slate-900 min-h-screen ">
            <div className='max-w-screen-xl min-h-screen mx-auto px-6 py-12 sm:px-6 lg:px-8 gap-16 items-center grid lg:grid-cols-2 md:grid-cols-2'>
                <div className="z-50">
                    <h1 className="text-3xl font-bold text-slate-700 dark:text-white sm:text-4xl">ByteStream</h1>
                    <p className="text-mono text-gray-500 dark:text-gray-400 mt-4">
                        ByteStream offers secure, efficient file transfers for all your needs. With advanced encryption and a user-friendly interface, ByteStream ensures your data is shared safely and swiftly, providing a seamless experience.
                    </p>
                    <button
                        className=' bg-slate-700 dark:bg-slate-700 text-white px-6 py-2 rounded-full mt-4 hover:bg-slate-900 focus:ring-slate-400 dark:hover:bg-slate-800 focus:ring-4 dark:focus:ring-slate-600 transition-all'
                        onClick={() => navigate('/upload')}
                    >
                        Get Started
                    </button>
                </div>
                <div className="gap-4">
                    <img src="/img/hero.svg" alt="hero contemt 1" className='w-full' />
                </div>
            </div>
        </section>
    )
}

export default OnboardingPage
