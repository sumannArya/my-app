import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import Link from 'next/link';
import { UserIcon } from 'lucide-react';

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth();
    const isOwnProfile = session?.user?.id === id;

    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Profile Header */}
            <div className="flex flex-col items-center justify-center text-center">
                <div className="h-28 w-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4 border-2 border-white shadow-md">
                    {user.image ? (
                        <img src={user.image} alt={user.name || "User"} className="h-full w-full object-cover" />
                    ) : (
                        <UserIcon className="h-16 w-16 text-gray-400" />
                    )}
                </div>

                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-500 mt-1">@{user.username || 'user'}</p>

                {user.bio && (
                    <p className="mt-4 max-w-md text-gray-700">{user.bio}</p>
                )}

                <div className="mt-4 flex gap-4 text-sm font-medium text-gray-900">
                    <div>
                        <span className="font-bold">0</span> followers
                    </div>
                    <div>
                        <span className="font-bold">0</span> following
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    <button className="rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-300">
                        Share
                    </button>

                    {isOwnProfile ? (
                        <Link href="/profile/edit" className="rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-300">
                            Edit Profile
                        </Link>
                    ) : (
                        <button className="rounded-full bg-red-600 px-6 py-2 text-white font-semibold hover:bg-red-700 transition">
                            Follow
                        </button>
                    )}
                </div>
            </div>

            {/* Tabs (Saved / Created) - Phase 4 */}
            <div className="mt-12 border-t border-gray-200 pt-8">
                <h3 className="text-center text-gray-500 text-sm">No pins yet</h3>
            </div>
        </div>
    );
}
