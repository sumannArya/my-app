'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function toggleLike(memeId: string) {
    const session = await auth();
    if (!session?.user?.id) return { message: 'Unauthorized' };

    try {
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_memeId: {
                    userId: session.user.id,
                    memeId,
                },
            },
        });

        if (existingLike) {
            await prisma.like.delete({
                where: {
                    userId_memeId: {
                        userId: session.user.id,
                        memeId,
                    },
                },
            });
        } else {
            await prisma.like.create({
                data: {
                    userId: session.user.id,
                    memeId,
                },
            });
        }

        revalidatePath('/feed');
        return { message: 'success' };
    } catch (error) {
        console.error('Like error:', error);
        return { message: 'Failed to like' };
    }
}

export async function toggleSave(memeId: string) {
    const session = await auth();
    if (!session?.user?.id) return { message: 'Unauthorized' };

    try {
        const existingSave = await prisma.savedMeme.findUnique({
            where: {
                userId_memeId: {
                    userId: session.user.id,
                    memeId,
                },
            },
        });

        if (existingSave) {
            await prisma.savedMeme.delete({
                where: {
                    userId_memeId: {
                        userId: session.user.id,
                        memeId,
                    },
                },
            });
        } else {
            await prisma.savedMeme.create({
                data: {
                    userId: session.user.id,
                    memeId,
                },
            });
        }

        revalidatePath('/feed');
        return { message: 'success' };
    } catch (error) {
        console.error('Save error:', error);
        return { message: 'Failed to save' };
    }
}
