import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ChatList from '../components/inbox/ChatList';
import ChatWindow from '../components/inbox/ChatWindow';
import LeadSidebar from '../components/inbox/LeadSidebar';

const Inbox = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [isLeadInfoOpen, setIsLeadInfoOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full flex border border-gray-200 rounded-lg overflow-hidden bg-white relative"
        >
            <ChatList selectedChat={selectedChat} onSelectChat={setSelectedChat} />
            <ChatWindow
                chat={selectedChat}
                onToggleLeadInfo={() => setIsLeadInfoOpen(!isLeadInfoOpen)}
            />
            <LeadSidebar
                isOpen={isLeadInfoOpen}
                onClose={() => setIsLeadInfoOpen(false)}
                lead={selectedChat}
            />
        </motion.div>
    );
};

export default Inbox;
