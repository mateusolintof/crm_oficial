import React from 'react';
import { Search } from 'lucide-react';

const mockChats = [
    {
        id: 1,
        name: 'João Silva',
        company: 'Tech Solutions',
        lastMessage: 'Obrigado pelo retorno!',
        time: '10:30',
        unread: 2,
        online: true,
    },
    {
        id: 2,
        name: 'Maria Costa',
        company: 'Marketing Pro',
        lastMessage: 'Quando podemos agendar?',
        time: '09:15',
        unread: 0,
        online: true,
    },
    {
        id: 3,
        name: 'Pedro Santos',
        company: 'Design Studio',
        lastMessage: 'Enviando o contrato...',
        time: 'Ontem',
        unread: 0,
        online: false,
    },
    {
        id: 4,
        name: 'Ana Souza',
        company: 'Retail Corp',
        lastMessage: 'Perfeito! Vamos fechar',
        time: 'Seg',
        unread: 5,
        online: false,
    },
];

const ChatList = ({ selectedChat, onSelectChat }) => {
    return (
        <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
            <div className="p-4 border-b border-gray-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Buscar conversas..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {mockChats.map((chat) => (
                    <div
                        key={chat.id}
                        onClick={() => onSelectChat(chat)}
                        className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${selectedChat?.id === chat.id ? 'bg-sky-50' : ''
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-bold">
                                    {chat.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                {chat.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-gray-900 text-sm truncate">{chat.name}</h3>
                                    <span className="text-xs text-gray-500 shrink-0 ml-2">{chat.time}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-1">{chat.company}</p>
                                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                            </div>
                            {chat.unread > 0 && (
                                <div className="bg-sky-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                                    {chat.unread}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatList;
