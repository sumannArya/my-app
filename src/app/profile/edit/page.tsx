'use client';

import { useActionState } from 'react';
import { updateProfile } from '@/app/actions/profile';
import { useSession } from 'next-auth/react';

export default function EditProfilePage() {
    const { data: session } = useSession();
    const [state, formAction, isPending] = useActionState(updateProfile, null);

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

            <form action={formAction} className="space-y-6 bg-white p-6 rounded-lg shadow">

                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={session?.user?.name || ''}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Username */}
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="unique_username"
                        // defaultValue would come from DB fetch in real app, session might not have it yet unless updated
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">Unique handle for your profile URL.</p>
                </div>

                {/* Bio */}
                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                        name="bio"
                        id="bio"
                        rows={3}
                        // defaultValue would come from DB
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Avatar Placeholder */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                    <div className="mt-2 flex items-center gap-x-3">
                        <div className="h-12 w-12 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">
                            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <button type="button" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            Change
                        </button>
                    </div>
                </div>

                {state?.message && (
                    <div className={`text-sm ${state.message === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                        {state.message === 'success' ? 'Profile updated!' : state.message}
                    </div>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                    >
                        {isPending ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
}
