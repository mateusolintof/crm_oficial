import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useCRMStore } from '../../store/useCRMStore';
import { Input } from '../ui/Input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

const ChatList = ({ selectedChat, onSelectChat }) => {
    const { leads } = useCRMStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredChats = leads.filter((lead) =>
        lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-80 border-r border-border bg-white/90 flex flex-col">
            <div className="p-4 border-b border-border">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        type="text"
                        placeholder="Buscar conversas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {filteredChats.map((chat) => (
                    <div
                        key={chat.id}
                        onClick={() => onSelectChat(chat)}
                        className={`p-4 border-b border-border/70 cursor-pointer transition-colors hover:bg-slate-50 ${selectedChat?.id === chat.id ? 'bg-primary-soft border-l-2 border-primary' : ''
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className="relative">
                                <Avatar>
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                        {chat.contact.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                {chat.status === 'new' && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-gray-900 text-sm truncate">{chat.contact}</h3>
                                    <span className="text-xs text-gray-500 shrink-0 ml-2">{chat.date}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-1">{chat.company}</p>
                                <p className="text-sm text-gray-600 truncate">
                                    {chat.status === 'new' ? '👋 Novo lead interessado!' : 'Aguardando resposta...'}
                                </p>
                            </div>
                            {chat.status === 'new' && (
                                <Badge variant="default" className="w-5 h-5 flex items-center justify-center p-0 rounded-full">
                                    1
                                </Badge>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatList;
