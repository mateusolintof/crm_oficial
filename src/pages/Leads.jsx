import React from 'react';
import { motion } from 'framer-motion';
import LeadList from '../components/leads/LeadList';

const Leads = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <LeadList />
        </motion.div>
    );
};

export default Leads;
