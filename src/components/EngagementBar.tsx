'use client';

import { toggleLike, toggleSave } from '@/app/actions/engagement';
import { Heart, Bookmark, Share2, MessageCircle } from 'lucide-react';
import { useState, useTransition } from 'react';

interface EngagementBarProps {
    memeId: string;
    initialLikes?: number;
    initialLiked?: boolean;
    initialSaved?: boolean;
}

export default function EngagementBar({ memeId, initialLikes = 0, initialLiked = false, initialSaved = false }: EngagementBarProps) {
    const [liked, setLiked] = useState(initialLiked);
    const [saved, setSaved] = useState(initialSaved);
    const [likesCount, setLikesCount] = useState(initialLikes);
    const [isPending, startTransition] = useTransition();

    const handleLike = () => {
        setLiked(!liked);
        setLikesCount(prev => liked ? prev - 1 : prev + 1);

        startTransition(async () => {
            await toggleLike(memeId);
        });
    };

    const handleSave = () => {
        setSaved(!saved);
        startTransition(async () => {
            await toggleSave(memeId);
        });
    };

    const handleShare = () => {
        navigator.clipboard.writeText(`${window.location.origin}/meme/${memeId}`);
        alert('Link copied to clipboard!');
    };

    return (
        <div className="flex items-center justify-between w-full mt-3 px-2">
            <div className="flex gap-4">
                <button
                    onClick={(e) => { e.preventDefault(); handleLike(); }}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors ${liked ? 'text-red-600' : 'text-gray-600 hover:text-red-500'}`}
                >
                    <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                    <span>{likesCount}</span>
                </button>

                <button
                    onClick={(e) => { e.preventDefault(); /* TODO: Implement comments */ }}
                    className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors"
                >
                    <MessageCircle className="w-5 h-5" />
                    {/* Placeholder for comment count if needed */}
                </button>

                <button
                    onClick={(e) => { e.preventDefault(); handleShare(); }}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <Share2 className="w-5 h-5" />
                </button>
            </div>

            <button
                onClick={(e) => { e.preventDefault(); handleSave(); }}
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${saved ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
            >
                <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
            </button>
        </div>
    );
}
