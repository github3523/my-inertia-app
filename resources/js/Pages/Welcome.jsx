import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [count, setCount] = useState(0);

    return (
        <>
            <Head title="Welcome" />
            <main className="min-h-screen bg-slate-950 text-slate-100">
                <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
                    <p className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-cyan-300">
                        React + Inertia is working
                    </p>

                    <h1 className="text-4xl font-bold sm:text-5xl">
                        Welcome.jsx is now your home page
                    </h1>

                    <p className="max-w-xl text-slate-300">
                        This page is rendered from React via Inertia. If you can
                        read this, your Laravel route is correctly linked to
                        resources/js/Pages/Welcome.jsx.
                    </p>

                    <button
                        type="button"
                        onClick={() => setCount((value) => value + 1)}
                        className="rounded-lg bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-400"
                    >
                        React counter: {count}
                    </button>

                    <div className="text-sm text-slate-400">
                        <p>Laravel {laravelVersion} - PHP {phpVersion}</p>
                        {auth?.user ? (
                            <Link href={route('dashboard')} className="text-cyan-300 underline">
                                Go to dashboard
                            </Link>
                        ) : (
                            <div className="flex items-center justify-center gap-4">
                                <Link href={route('login')} className="text-cyan-300 underline">
                                    Login
                                </Link>
                                <Link href={route('register')} className="text-cyan-300 underline">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}
