'use server';

import { prisma } from '@/lib/prisma';

export async function getMemes() {
    try {
        const memes = await prisma.meme.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image: true,
                    },
                },
            },
        });
        return memes;
    } catch (error) {
        console.error('Failed to fetch memes:', error);
        return [];
    }
}
