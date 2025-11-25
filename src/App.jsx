import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Kanban = lazy(() => import('./pages/Kanban'));
const Inbox = lazy(() => import('./pages/Inbox'));
const Leads = lazy(() => import('./pages/Leads'));
const Guide = lazy(() => import('./pages/Guide'));

function App() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-500">Carregando...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="pipelines/:pipelineId" element={<Kanban />} />
          <Route path="kanban" element={<Navigate to="/pipelines/sales" replace />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="leads" element={<Leads />} />
          <Route path="guia-ui" element={<Guide />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
