'use client';

import { useActionState } from 'react';
import { createMeme } from '@/app/actions/meme';

export default function CreateMemePage() {
    const [state, formAction, isPending] = useActionState(createMeme, null);

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Post a Meme</h1>

            <form action={formAction} className="space-y-6 bg-white p-6 rounded-lg shadow">

                {/* Image URL Input (Fallback) */}
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="url"
                        name="imageUrl"
                        id="imageUrl"
                        required
                        placeholder="https://example.com/funny-meme.jpg"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">Paste a direct link to an image.</p>
                </div>

                {/* Caption */}
                <div>
                    <label htmlFor="caption" className="block text-sm font-medium text-gray-700">Caption</label>
                    <textarea
                        name="caption"
                        id="caption"
                        rows={3}
                        placeholder="Write a funny caption..."
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                {state?.message && (
                    <div className="text-sm text-red-600">
                        {state.message}
                    </div>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                    >
                        {isPending ? 'Posting...' : 'Post Meme'}
                    </button>
                </div>
            </form>
        </div>
    );
}
