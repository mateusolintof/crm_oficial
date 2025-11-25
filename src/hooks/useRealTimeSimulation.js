import { useEffect } from 'react';
import { useCRMStore } from '../store/useCRMStore';

const useRealTimeSimulation = () => {
    const { addLead, updateLeadStatus, leads } = useCRMStore();

    useEffect(() => {
        const interval = setInterval(() => {
            const randomAction = Math.random();

            // 10% chance to add a new lead
            if (randomAction < 0.1) {
                const newLead = {
                    id: Math.random().toString(36).substr(2, 9),
                    company: `Nova Empresa ${Math.floor(Math.random() * 100)}`,
                    contact: 'Novo Contato',
                    value: `R$ ${Math.floor(Math.random() * 10000)}`,
                    date: 'Hoje',
                    tags: ['Novo'],
                    pipeline: 'sales',
                    status: 'new',
                };
                // console.log('Simulating Real-time: New Lead Added', newLead);
                // addLead(newLead); // Commented out to avoid spamming, uncomment to test
            }

            // 20% chance to move a random lead
            if (randomAction > 0.8 && leads.length > 0) {
                const randomLead = leads[Math.floor(Math.random() * leads.length)];
                const statuses = ['new', 'qualified', 'negotiation', 'contract', 'closed'];
                const currentStatusIndex = statuses.indexOf(randomLead.status);
                const nextStatus = statuses[currentStatusIndex + 1] || statuses[0];

                // console.log(`Simulating Real-time: Moving ${randomLead.company} to ${nextStatus}`);
                // updateLeadStatus(randomLead.id, nextStatus); // Commented out to avoid chaos
            }

        }, 10000); // Check every 10 seconds

        return () => clearInterval(interval);
    }, [addLead, updateLeadStatus, leads]);
};

export default useRealTimeSimulation;
