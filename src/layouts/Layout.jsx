import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CommandPalette from '../components/CommandPalette';
import useRealTimeSimulation from '../hooks/useRealTimeSimulation';
import { useAuthStore } from '../store/useAuthStore';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Bell } from 'lucide-react';

const Layout = () => {
    // Activate Real-time Simulation
    useRealTimeSimulation();

    const { user } = useAuthStore();

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
            <Sidebar />
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Bem-vindo, {user?.name.split(' ')[0]}
                        </h2>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-md border border-gray-200 hidden md:inline-block">
                            ⌘K para comandos
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="w-5 h-5 text-gray-500" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </Button>

                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                <p className="text-xs text-gray-500">{user?.role}</p>
                            </div>
                            <Avatar>
                                <AvatarImage src={user?.avatar} />
                                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-8 relative">
                    <Outlet />
                </div>
            </main>

            <CommandPalette />
        </div>
    );
};

export default Layout;
