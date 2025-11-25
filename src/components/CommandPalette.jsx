import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { Search, Plus, User, MessageSquare, LayoutDashboard, Kanban, Users, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../store/useUIStore';
import { useCRMStore } from '../store/useCRMStore';
import { Dialog, DialogContent, DialogOverlay } from './ui/Dialog';
import { motion, AnimatePresence } from 'framer-motion';

const CommandPalette = () => {
    const navigate = useNavigate();
    const { isCommandPaletteOpen, setCommandPaletteOpen, openModal } = useUIStore();
    const { leads } = useCRMStore();
    const [search, setSearch] = useState('');

    useEffect(() => {
        const down = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandPaletteOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [setCommandPaletteOpen]);

    const runCommand = (command) => {
        setCommandPaletteOpen(false);
        command();
    };

    if (!isCommandPaletteOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setCommandPaletteOpen(false)} />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200"
            >
                <Command className="w-full">
                    <div className="flex items-center border-b border-gray-100 px-4">
                        <Search className="w-5 h-5 text-gray-400 mr-2" />
                        <Command.Input
                            value={search}
                            onValueChange={setSearch}
                            placeholder="O que você precisa?"
                            className="w-full h-14 outline-none text-gray-800 placeholder:text-gray-400 text-lg"
                        />
                        <button onClick={() => setCommandPaletteOpen(false)} className="text-gray-400 hover:text-gray-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <Command.List className="max-h-[300px] overflow-y-auto p-2">
                        <Command.Empty className="py-6 text-center text-sm text-gray-500">
                            Nenhum resultado encontrado.
                        </Command.Empty>

                        <Command.Group heading="Ações Rápidas" className="px-2 py-1.5 text-xs font-medium text-gray-500 mb-2">
                            <Command.Item
                                onSelect={() => runCommand(() => openModal('create-lead'))}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 aria-selected:bg-primary aria-selected:text-white transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Novo Lead</span>
                            </Command.Item>
                        </Command.Group>

                        <Command.Group heading="Navegação" className="px-2 py-1.5 text-xs font-medium text-gray-500 mb-2">
                            <Command.Item onSelect={() => runCommand(() => navigate('/'))} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 aria-selected:bg-primary aria-selected:text-white transition-colors">
                                <LayoutDashboard className="w-4 h-4" />
                                <span>Dashboard</span>
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => navigate('/kanban'))} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 aria-selected:bg-primary aria-selected:text-white transition-colors">
                                <Kanban className="w-4 h-4" />
                                <span>Pipeline (Kanban)</span>
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => navigate('/inbox'))} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 aria-selected:bg-primary aria-selected:text-white transition-colors">
                                <MessageSquare className="w-4 h-4" />
                                <span>Inbox</span>
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => navigate('/leads'))} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 aria-selected:bg-primary aria-selected:text-white transition-colors">
                                <Users className="w-4 h-4" />
                                <span>Leads</span>
                            </Command.Item>
                        </Command.Group>

                        <Command.Group heading="Leads Recentes" className="px-2 py-1.5 text-xs font-medium text-gray-500 mb-2">
                            {leads.slice(0, 3).map((lead) => (
                                <Command.Item
                                    key={lead.id}
                                    onSelect={() => runCommand(() => navigate('/kanban'))}
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 aria-selected:bg-primary aria-selected:text-white transition-colors"
                                >
                                    <User className="w-4 h-4" />
                                    <span>{lead.company} - {lead.contact}</span>
                                </Command.Item>
                            ))}
                        </Command.Group>
                    </Command.List>
                </Command>
            </motion.div>
        </div>
    );
};

export default CommandPalette;
