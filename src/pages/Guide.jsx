import React from 'react';

const chips = [
    { label: 'Spacing 4px', value: 'space-1' },
    { label: 'Spacing 8px', value: 'space-2' },
    { label: 'Spacing 12px', value: 'space-3' },
    { label: 'Spacing 16px', value: 'space-4' },
    { label: 'Spacing 20px', value: 'space-5' },
    { label: 'Spacing 24px', value: 'space-6' },
];

const colors = [
    { name: 'Primary', var: '--color-primary' },
    { name: 'Primary Soft', var: '--color-primary-soft' },
    { name: 'Accent', var: '--color-accent' },
    { name: 'Ink', var: '--color-ink' },
    { name: 'Ink Muted', var: '--color-ink-muted' },
    { name: 'Surface', var: '--color-surface' },
    { name: 'Border', var: '--color-border' },
    { name: 'Canvas', var: '--color-canvas' },
];

const Guide = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <header className="flex items-center justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Design System</p>
                    <h1 className="text-2xl font-bold text-ink">Guia de UI</h1>
                    <p className="text-slate-600 mt-1">Tokens, componentes base e escala de espaçamento.</p>
                </div>
                <div className="text-right text-xs text-slate-500">
                    Fonte: Space Grotesk · Base: 15px · Radius: 8/12/16 · Sombra: soft/card
                </div>
            </header>

            <section className="card">
                <h2 className="text-lg font-semibold text-ink mb-3">Tokens de cor</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {colors.map((c) => (
                        <div key={c.name} className="border border-border rounded-md p-3 flex items-center gap-3">
                            <span
                                className="h-8 w-8 rounded-md border border-border"
                                style={{ background: `var(${c.var})` }}
                            />
                            <div className="text-sm">
                                <div className="font-semibold text-ink">{c.name}</div>
                                <div className="text-xs text-slate-500">{c.var}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="card">
                <h2 className="text-lg font-semibold text-ink mb-3">Tipografia</h2>
                <div className="space-y-2 text-slate-700">
                    <div className="text-xs">Texto XS (11px) — legendas e labels densos</div>
                    <div className="text-sm">Texto SM (13px) — metadados e subtítulos</div>
                    <div className="text-base">Texto Base (15px) — body</div>
                    <div className="text-lg font-semibold">Texto LG (18px) — títulos de cards</div>
                    <div className="text-xl font-semibold">Texto XL (22px) — cabeçalhos</div>
                </div>
            </section>

            <section className="card">
                <h2 className="text-lg font-semibold text-ink mb-3">Escala de espaçamento</h2>
                <div className="flex flex-wrap gap-2">
                    {chips.map((chip) => (
                        <span key={chip.value} className="px-3 py-1 rounded-full border border-border text-xs text-slate-700 bg-white">
                            {chip.label}
                        </span>
                    ))}
                </div>
                <p className="text-sm text-slate-600 mt-3">Use apenas múltiplos de 4px (4/8/12/16/20/24) para paddings, gaps e margens.</p>
            </section>

            <section className="card space-y-3">
                <h2 className="text-lg font-semibold text-ink">Primitivos</h2>
                <div className="flex flex-wrap gap-3 items-center">
                    <button className="btn btn-primary">Primary</button>
                    <button className="btn btn-ghost border border-border rounded-md">Ghost</button>
                    <button className="btn btn-primary rounded-md" disabled>Disabled</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <label className="text-xs text-slate-500">Input</label>
                        <input className="flex h-10 w-full rounded-md border border-border bg-white px-3 py-2 text-sm" placeholder="Placeholder" readOnly />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-500">Badge</label>
                        <div className="flex gap-2">
                            <span className="inline-flex items-center rounded-full border px-2 py-[3px] text-[11px] font-semibold bg-primary-soft text-primary border-primary/30">Info</span>
                            <span className="inline-flex items-center rounded-full border px-2 py-[3px] text-[11px] font-semibold bg-emerald-50 text-emerald-700 border-emerald-100">Success</span>
                            <span className="inline-flex items-center rounded-full border px-2 py-[3px] text-[11px] font-semibold bg-rose-50 text-rose-700 border-rose-100">Alert</span>
                        </div>
                    </div>
                </div>
                <p className="text-sm text-slate-600">Buttons e badges seguem a escala: altura 40px, padding lateral 14px, radius md (8px), texto 15px/11px conforme o componente.</p>
            </section>

            <section className="card space-y-2">
                <h2 className="text-lg font-semibold text-ink">Padrões de layout</h2>
                <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                    <li>Container full-width com gutters 20px (desktop), 16px (mobile).</li>
                    <li>Header 56–60px, sidebar 240–260px.</li>
                    <li>Grid kanban: colunas 260–280px, gap 12–16px, cards com padding 12–16px.</li>
                    <li>Use radius md (8px) para input/card e lg (12–16px) só em destaques.</li>
                    <li>Sombras: soft para superfícies flutuantes, card para destaques.</li>
                </ul>
            </section>
        </div>
    );
};

export default Guide;
