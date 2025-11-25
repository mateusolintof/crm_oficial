import React, { useState } from 'react';
import { Send, Paperclip, Smile, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const mockMessages = [
    {
        id: 1,
        text: 'Olá! Gostaria de conhecer mais sobre os serviços da ALMA',
        sender: 'client',
        time: '10:15',
    },
    {
        id: 2,
        text: 'Olá João! Claro, temos soluções completas em marketing digital. Qual é o seu principal desafio hoje?',
        sender: 'agent',
        time: '10:16',
    },
    {
        id: 3,
        text: 'Precisamos melhorar nossa presença nas redes sociais e aumentar as vendas',
        sender: 'client',
        time: '10:18',
    },
    {
        id: 4,
        text: 'Perfeito! Temos cases de sucesso exatamente nessa área. Posso enviar um portfólio?',
        sender: 'agent',
        time: '10:20',
    },
    {
        id: 5,
        text: 'Sim, por favor!',
        sender: 'client',
        time: '10:30',
    },
];

const ChatWindow = ({ chat, onToggleLeadInfo }) => {
    const [messages, setMessages] = useState(mockMessages);
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (inputValue.trim()) {
            setMessages([
                ...messages,
                {
                    id: messages.length + 1,
                    text: inputValue,
                    sender: 'agent',
                    time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                },
            ]);
            setInputValue('');
        }
    };

    if (!chat) {
        return (
            <div className="flex-1 bg-slate-50 flex items-center justify-center">
                <div className="text-center text-slate-400">
                    <p className="text-lg font-medium">Selecione uma conversa</p>
                    <p className="text-sm mt-2">Escolha um contato para iniciar o atendimento</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-slate-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-border px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary text-white rounded-full hover:bg-primary-strong transition-colors shadow-md flex items-center justify-center font-bold">
                        {chat.contact.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <h3 className="font-bold text-ink">{chat.contact}</h3>
                        <p className="text-xs text-slate-500">{chat.company}</p>
                    </div>
                </div>
                <button
                    onClick={onToggleLeadInfo}
                    className="btn btn-ghost gap-2 border border-border rounded-lg"
                >
                    <Info size={18} />
                    Informações
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                    <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[70%] p-3 rounded-2xl ${message.sender === 'agent'
                                ? 'bg-primary text-white rounded-tr-none shadow-sm'
                                : 'bg-white text-ink rounded-tl-none shadow-sm border border-border'
                                }`}
                        >
                            <p className="text-sm">{message.text}</p>
                            <p
                                className={`text-xs mt-1 ${message.sender === 'agent' ? 'text-primary-soft' : 'text-slate-500'
                                    }`}
                            >
                                {message.time}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Input */}
            <div className="bg-white border-t border-border p-4">
                <div className="flex items-center gap-3">
                    <button className="text-gray-400 hover:text-gray-600">
                        <Paperclip size={20} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                        <Smile size={20} />
                    </button>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Digite sua mensagem..."
                        className="flex-1 px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button onClick={handleSend} className="btn btn-primary gap-2">
                        <Send size={18} />
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
