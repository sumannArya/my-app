import Link from 'next/link';
import EngagementBar from './EngagementBar';

interface MemeProps {
    id: string;
    imageUrl: string;
    caption: string | null;
    user: {
        id: string;
        name: string | null;
        username: string | null;
        image: string | null;
    };
}

export default function MemeCard({ meme }: { meme: MemeProps }) {
    return (
        <div className="mb-4 break-inside-avoid rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
            <div className="relative group">
                <img
                    src={meme.imageUrl}
                    alt={meme.caption || 'Meme'}
                    className="w-full h-auto object-cover rounded-lg"
                    loading="lazy"
                />
                {/* Overlay for hover actions (Like/Save) - Phase 6 */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg" />
            </div>

            {meme.caption && (
                <p className="mt-2 px-2 text-sm font-medium text-gray-900 line-clamp-2">
                    {meme.caption}
                </p>
            )}

            <div className="mt-2 px-2 pb-2 flex items-center gap-2">
                {meme.user.image && (
                    <img src={meme.user.image} alt="Avatar" className="w-6 h-6 rounded-full" />
                )}
                <Link href={`/user/${meme.user.id}`} className="text-xs text-gray-600 hover:underline truncate">
                    {meme.user.username || meme.user.name || 'Anonymous'}
                </Link>
            </div>
        </div>
    );
}
