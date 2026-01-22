import { getMemes } from '@/app/actions/feed';
import MasonryGrid from '@/components/MasonryGrid';
import MemeCard from '@/components/MemeCard';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function FeedPage() {
    const session = await auth();
    if (!session) {
        redirect('/login');
    }

    const memes = await getMemes();

    return (
        <main className="pt-6 min-h-screen bg-white">
            {memes.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-xl">No memes yet!</p>
                    <p className="mt-2 text-sm">Be the first to post something funny.</p>
                </div>
            ) : (
                <MasonryGrid>
                    {memes.map((meme) => (
                        <MemeCard key={meme.id} meme={meme} />
                    ))}
                </MasonryGrid>
            )}
        </main>
    );
}
