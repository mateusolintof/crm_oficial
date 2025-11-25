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
        <div className="flex min-h-screen bg-canvas text-ink">
            <Sidebar />
            <main className="flex-1 flex flex-col h-screen overflow-hidden bg-surface/70 backdrop-blur-sm">
                <header className="sticky top-0 z-20 h-14 border-b border-border bg-surface/80 backdrop-blur flex items-center justify-between px-5">
                    <div className="flex items-center gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Workspace</p>
                            <h2 className="text-lg font-semibold text-ink">
                                Bem-vindo, {user?.name.split(' ')[0]}
                            </h2>
                        </div>
                        <span className="hidden md:inline-flex text-[11px] text-slate-600 bg-slate-100 px-3 py-[6px] rounded-full border border-border font-medium">
                            ⌘K · Acesso rápido
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative border border-border rounded-xl h-10 w-10">
                            <Bell className="w-4 h-4 text-slate-600" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border border-white"></span>
                        </Button>

                        <div className="flex items-center gap-3 pl-4 border-l border-border">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-semibold text-ink">{user?.name}</p>
                                <p className="text-xs text-slate-500">{user?.role}</p>
                            </div>
                            <Avatar className="ring-2 ring-border h-9 w-9">
                                <AvatarImage src={user?.avatar} />
                                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto">
                    <div className="w-full px-5 py-6">
                        <Outlet />
                    </div>
                </div>
            </main>

            <CommandPalette />
        </div>
    );
};

export default Layout;
