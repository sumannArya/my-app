'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, PlusSquare, MessageCircle, User } from 'lucide-react';

export default function MobileNav({ user }: { user: any }) {
    const pathname = usePathname();

    const navItems = [
        { name: 'Home', href: '/feed', icon: Home },
        { name: 'Search', href: '/search', icon: Search }, // Placeholder
        { name: 'Create', href: '/create', icon: PlusSquare },
        { name: 'Inbox', href: '/notifications', icon: MessageCircle }, // Placeholder
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-6 py-3 flex justify-between items-center pb-safe">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link key={item.name} href={item.href} className="flex flex-col items-center gap-1">
                        <item.icon className={`w-7 h-7 ${isActive ? 'text-black fill-current' : 'text-gray-500'}`} />
                    </Link>
                );
            })}
            <Link href={`/user/${user?.id}`} className="flex flex-col items-center gap-1">
                {user?.image ? (
                    <img src={user.image} alt="Me" className={`w-7 h-7 rounded-full border-2 ${pathname.startsWith('/user') ? 'border-black' : 'border-transparent'}`} />
                ) : (
                    <User className={`w-7 h-7 ${pathname.startsWith('/user') ? 'text-black fill-current' : 'text-gray-500'}`} />
                )}
            </Link>
        </div>
    );
}
