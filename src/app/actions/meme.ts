'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const MemeSchema = z.object({
    caption: z.string().max(300).optional(),
    imageUrl: z.string().url(),
});

export async function createMeme(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        return { message: 'Unauthorized' };
    }

    const data = {
        caption: formData.get('caption') as string,
        imageUrl: formData.get('imageUrl') as string,
    };

    const parsed = MemeSchema.safeParse(data);

    if (!parsed.success) {
        return { message: 'Invalid input', errors: parsed.error.flatten().fieldErrors };
    }

    try {
        await prisma.meme.create({
            data: {
                caption: parsed.data.caption,
                imageUrl: parsed.data.imageUrl,
                userId: session.user.id,
            },
        });
    } catch (error) {
        console.error('Create Meme error:', error);
        return { message: 'Failed to post meme' };
    }

    revalidatePath('/');
    redirect('/');
}
