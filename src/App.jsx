import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import Kanban from './pages/Kanban';
import Inbox from './pages/Inbox';
import Leads from './pages/Leads';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="kanban" element={<Kanban />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="leads" element={<Leads />} />
      </Route>
    </Routes>
  );
}

export default App;
