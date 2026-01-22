'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const ProfileSchema = z.object({
    name: z.string().min(2).optional(),
    bio: z.string().max(160).optional(),
    username: z.string().min(3).regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores").optional(),
});

export async function updateProfile(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        return { message: 'Unauthorized' };
    }

    const data = {
        name: formData.get('name') as string,
        bio: formData.get('bio') as string,
        username: formData.get('username') as string,
    };

    const parsed = ProfileSchema.safeParse(data);

    if (!parsed.success) {
        return { message: 'Invalid input', errors: parsed.error.flatten().fieldErrors };
    }

    try {
        // Check if username is taken (if changed)
        if (parsed.data.username) {
            const existing = await prisma.user.findUnique({
                where: { username: parsed.data.username }
            });
            if (existing && existing.id !== session.user.id) {
                return { message: 'Username already taken' };
            }
        }

        await prisma.user.update({
            where: { id: session.user.id },
            data: parsed.data,
        });

        revalidatePath('/profile/edit');
        revalidatePath(`/user/${session.user.id}`);

        return { message: 'success' };
    } catch (error) {
        console.error('Profile update error:', error);
        return { message: 'Failed to update profile' };
    }
}
