import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, DollarSign, Tag, Calendar } from 'lucide-react';

const LeadSidebar = ({ isOpen, onClose, lead }) => {
    if (!lead) return null;

    const leadDetails = {
        email: 'joao.silva@techsolutions.com',
        phone: '+55 11 98765-4321',
        location: 'São Paulo, SP',
        value: 'R$ 5.000',
        stage: 'Qualificado',
        created: '20 Nov 2025',
        tags: ['Quente', 'Prioridade Alta'],
        notes: 'Cliente em potencial para pacote completo de marketing digital. Demonstrou interesse em SEO e redes sociais.',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black bg-opacity-30 z-40"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-border flex items-center justify-between">
                            <h2 className="text-xl font-bold text-ink">Informações do Lead</h2>
                            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* Profile */}
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-2xl mb-3">
                                    {lead.contact.split(' ').map((n) => n[0]).join('')}
                                </div>
                                <h3 className="font-bold text-ink text-lg">{lead.contact}</h3>
                                <p className="text-sm text-slate-500">{lead.company}</p>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-3">
                                <h4 className="font-bold text-ink text-sm uppercase tracking-wider">Contato</h4>
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail size={16} className="text-slate-400" />
                                    <span className="text-slate-700">{leadDetails.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone size={16} className="text-slate-400" />
                                    <span className="text-slate-700">{leadDetails.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin size={16} className="text-slate-400" />
                                    <span className="text-slate-700">{leadDetails.location}</span>
                                </div>
                            </div>

                            {/* Deal Info */}
                            <div className="space-y-3">
                                <h4 className="font-bold text-ink text-sm uppercase tracking-wider">Oportunidade</h4>
                                <div className="flex items-center gap-3 text-sm">
                                    <DollarSign size={16} className="text-slate-400" />
                                    <span className="text-slate-800 font-medium">{leadDetails.value}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar size={16} className="text-slate-400" />
                                    <span className="text-slate-700">Criado em {leadDetails.created}</span>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="space-y-3">
                                <h4 className="font-bold text-ink text-sm uppercase tracking-wider flex items-center gap-2">
                                    <Tag size={16} />
                                    Tags
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {leadDetails.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-primary-soft text-primary rounded-full text-xs font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="space-y-3">
                                <h4 className="font-bold text-ink text-sm uppercase tracking-wider">Anotações</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">{leadDetails.notes}</p>
                            </div>

                            {/* Custom Fields */}
                            <div className="space-y-3">
                                <h4 className="font-bold text-ink text-sm uppercase tracking-wider">Campos Personalizados</h4>
                                <div className="space-y-2">
                                    <div>
                                        <label className="text-xs text-slate-500">Origem</label>
                                        <p className="text-sm font-medium text-ink">Instagram</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500">Interesse Principal</label>
                                        <p className="text-sm font-medium text-ink">Marketing de Conteúdo</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 border-t border-border flex gap-3">
                            <button className="flex-1 btn btn-ghost rounded-xl">Editar</button>
                            <button className="flex-1 btn btn-primary bg-primary hover:bg-primary-strong text-white rounded-xl">Converter</button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default LeadSidebar;
