import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Dashboard({ stats, recent_audits, remainingScans }) {
    const { data, setData, post, processing, errors } = useForm({
        url: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('scan'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold dark:text-white">Profit Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-gray-900 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* SCAN FORM */}
                    <div className="bg-gray-800 rounded-lg p-6 shadow-xl mb-6">
                        <h3 className="text-white text-lg mb-4">Scan a URL</h3>
                        <p className="text-gray-400 mb-4">Remaining free scans this month: {remainingScans}</p>
                        <form onSubmit={submit}>
                            <div className="flex space-x-4">
                                <input
                                    type="url"
                                    value={data.url}
                                    onChange={(e) => setData('url', e.target.value)}
                                    placeholder="Enter URL to scan"
                                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded"
                                    required
                                    disabled={remainingScans === 0}
                                />
                                <button
                                    type={remainingScans === 0 ? 'button' : 'submit'}
                                    onClick={remainingScans === 0 ? () => window.location.href = route('pricing') : undefined}
                                    disabled={processing && remainingScans > 0}
                                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {remainingScans === 0 ? 'Upgrade' : processing ? 'Scanning...' : 'Scan'}
                                </button>
                            </div>
                            {remainingScans === 0 && (
                                <p className="text-yellow-500 mt-2">
                                    Free limit reached. <a href={route('pricing')} className="underline">Upgrade to Premium</a>
                                </p>
                            )}
                            {errors.url && <p className="text-red-500 mt-2">{errors.url}</p>}
                        </form>
                    </div>

                    {/* TOP STATS CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="p-6 bg-gray-800 border border-green-500 rounded-lg shadow-lg">
                            <h3 className="text-green-400 text-sm uppercase">Monthly Revenue</h3>
                            <p className="text-4xl font-extrabold text-white">{stats.revenue}</p>
                        </div>
                        <div className="p-6 bg-gray-800 border border-blue-500 rounded-lg shadow-lg">
                            <h3 className="text-blue-400 text-sm uppercase">Active Audits</h3>
                            <p className="text-4xl font-extrabold text-white">{stats.scans}</p>
                        </div>
                    </div>

                    {/* RECENT ACTIVITY TABLE */}
                    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
                        <h3 className="text-white text-lg mb-4">Live Threat Map</h3>
                        <div className="space-y-3">
                            {recent_audits.map((audit) => (
                                <div key={audit.id} className="flex justify-between p-3 bg-gray-700 rounded">
                                    <span className="text-gray-200">{audit.url}</span>
                                    <span className={audit.status === 'Safe' ? 'text-green-400' : 'text-red-500 font-bold'}>
                                        {audit.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}