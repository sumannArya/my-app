'use client';

import { useActionState, useState } from 'react';
import { createMeme } from '@/app/actions/meme';
import { Upload } from 'lucide-react';

export default function CreateMemePage() {
    const [state, formAction, isPending] = useActionState(createMeme, null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Post a Meme</h1>

            <form action={formAction} className="space-y-6">

                {/* File Upload Area */}
                <div className="flex flex-col items-center justify-center w-full">
                    <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {preview ? (
                                <img src={preview} alt="Preview" className="max-h-56 object-contain" />
                            ) : (
                                <>
                                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                                </>
                            )}
                        </div>
                        <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        {/* Hidden input to send base64 string to server action */}
                        <input type="hidden" name="imageUrl" value={preview || ''} />
                    </label>
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
                        disabled={isPending || !preview}
                        className="rounded-full bg-red-600 px-6 py-2 text-sm font-bold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 transition"
                    >
                        {isPending ? 'Publishing...' : 'Publish'}
                    </button>
                </div>
            </form>
        </div>
    );
}
