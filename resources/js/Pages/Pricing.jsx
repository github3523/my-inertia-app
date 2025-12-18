import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Pricing() {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold dark:text-white">Pricing</h2>}
        >
            <Head title="Pricing" />

            <div className="py-12 bg-gray-900 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white">Choose Your Plan</h1>
                        <p className="text-gray-400 mt-2">Unlock unlimited scans and premium features.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Free Plan */}
                        <div className="p-6 bg-gray-800 border border-gray-600 rounded-lg shadow-lg">
                            <h3 className="text-white text-xl font-bold">Free</h3>
                            <p className="text-gray-400">$0/month</p>
                            <ul className="text-gray-300 mt-4 space-y-2">
                                <li>5 scans per month</li>
                                <li>Basic threat detection</li>
                                <li>Email support</li>
                            </ul>
                            <button className="mt-6 w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
                                Current Plan
                            </button>
                        </div>

                        {/* Premium Plan */}
                        <div className="p-6 bg-gray-800 border border-green-500 rounded-lg shadow-lg">
                            <h3 className="text-green-400 text-xl font-bold">Premium</h3>
                            <p className="text-white">$9.99/month</p>
                            <ul className="text-gray-300 mt-4 space-y-2">
                                <li>Unlimited scans</li>
                                <li>Advanced threat detection</li>
                                <li>Priority support</li>
                                <li>Detailed reports</li>
                            </ul>
                            <button className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                Upgrade Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}