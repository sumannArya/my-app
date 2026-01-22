'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, PlusSquare, Bell, User, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function Sidebar({ user }: { user: any }) {
    const pathname = usePathname();

    const navItems = [
        { name: 'Home', href: '/feed', icon: Home },
        { name: 'Create', href: '/create', icon: PlusSquare },
        { name: 'Notifications', href: '/notifications', icon: Bell }, // Placeholder for Phase 8
    ];

    return (
        <div className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-200 p-4 z-50">
            <div className="mb-8 px-2">
                <h1 className="text-2xl font-bold text-red-600 tracking-tight">Memeterest</h1>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-4 px-4 py-3 rounded-full font-medium transition-colors ${isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <item.icon className="w-6 h-6" />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}

                <Link
                    href={`/user/${user?.id}`}
                    className={`flex items-center gap-4 px-4 py-3 rounded-full font-medium transition-colors ${pathname.startsWith('/user') ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    {user?.image ? (
                        <img src={user.image} alt="Me" className="w-6 h-6 rounded-full" />
                    ) : (
                        <User className="w-6 h-6" />
                    )}
                    <span>Profile</span>
                </Link>
            </nav>

            <div className="mt-auto pt-4 border-t border-gray-100">
                <button
                    onClick={() => signOut()}
                    className="flex items-center gap-4 px-4 py-3 rounded-full font-medium text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                    <LogOut className="w-6 h-6" />
                    <span>Log out</span>
                </button>
            </div>
        </div>
    );
}
