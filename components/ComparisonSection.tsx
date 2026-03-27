"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

/* ─── Legacy interface (Antes) ───────────────────────────────────── */
function OldInterface() {
  const rows = [
    ["001", "Produto A - Varejo",      "152",  "R$ 45,00",  "R$ 6.840,00",    "ATIVO",    "JOAO_ADM", "15/03/01"],
    ["002", "Produto B - Atacado",      "89",  "R$ 120,00", "R$ 10.680,00",   "INATIVO",  "MARIA_VD", "16/03/01"],
    ["003", "Serv. Manutenção",         "23",  "R$ 350,00",  "R$ 8.050,00",   "PENDENTE", "PEDRO_TI", "17/03/01"],
    ["004", "Produto C - Import.",       "7",  "R$ 985,00",  "R$ 6.895,00",   "ATIVO",    "JOAO_ADM", "18/03/01"],
    ["005", "Estoque - Galpão 2",      "234",   "R$ 12,50",  "R$ 2.925,00",   "VENCIDO",  "ANA_OP",   "19/03/01"],
    ["006", "Comissão Vendas",          "---",       "---",  "R$ 4.230,00",   "ABERTO",   "SISTEMA",  "20/03/01"],
    ["007", "Produto D - Local",         "45",  "R$ 67,00",  "R$ 3.015,00",   "ATIVO",    "CARLOS_V", "21/03/01"],
    ["008", "Devolução Estoque",         "-12", "R$ 120,00", "(R$ 1.440,00)", "ERRO!",    "SISTEMA",  "22/03/01"],
  ];

  return (
    <div className="w-full h-full bg-[#d4d0c8] font-mono text-[10px] text-black select-none">
      {/* Title bar */}
      <div className="flex items-center justify-between bg-linear-to-r from-[#003c74] to-[#428fd8] px-2 py-0.75">
        <span className="text-white text-[10px] font-bold truncate">
          📊 GestorMax Pro 2001 — [ANNUAL_REL_2001_v3_FINAL2.xls]
        </span>
        <div className="flex gap-px ml-1 shrink-0">
          {["_", "□", "×"].map((b, i) => (
            <div
              key={i}
              className="bg-[#d4d0c8] border border-t-white border-l-white border-b-[#404040] border-r-[#404040] w-4 h-3.25 text-[9px] flex items-center justify-center text-black"
            >
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* Menu bar */}
      <div className="bg-[#d4d0c8] border-b border-[#808080] flex text-[10px] px-1 overflow-hidden">
        {["Arquivo", "Editar", "Exibir", "Inserir", "Formatar", "Ferramentas", "Dados", "Janela", "Ajuda"].map((m) => (
          <span key={m} className="px-1.5 py-px cursor-default whitespace-nowrap">
            {m}
          </span>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-[#d4d0c8] border-b border-[#808080] flex items-center gap-px px-2 py-0.75 overflow-hidden">
        {["💾", "🖨️", "✂️", "📋", "↩", "↪", "🔍", "📊", "🔄"].map((icon, i) => (
          <div
            key={i}
            className="w-4.75 h-4.5 bg-[#d4d0c8] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] flex items-center justify-center text-[10px] cursor-default shrink-0"
          >
            {icon}
          </div>
        ))}
        <div className="h-3 w-px bg-[#808080] mx-1" />
        <span className="text-[9px] text-black truncate">
          Filtro: ANO=2001 | EMP=001 | DEP=TODOS | STATUS=TODOS
        </span>
      </div>

      {/* Scrollable table */}
      <div className="overflow-auto bg-white" style={{ height: "calc(100% - 95px)" }}>
        <table className="w-full text-[9px] border-collapse">
          <thead className="sticky top-0">
            <tr className="bg-[#d4d0c8]">
              {["Cód.", "Descrição", "Qtd", "Vl. Unit.", "Total", "Status", "Usuário", "Data"].map((h) => (
                <th key={h} className="border border-[#808080] px-1 py-0.5 text-left font-bold whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-[#eeeee8]"}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`border border-[#d4d0c8] px-1 py-0.5 whitespace-nowrap ${
                      cell === "ERRO!"   ? "text-red-600 font-bold bg-yellow-100" :
                      cell === "VENCIDO" ? "text-orange-600" :
                      cell === "PENDENTE" ? "text-yellow-600" :
                      cell === "INATIVO" ? "text-blue-700" : ""
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#d4d0c8] border-t border-[#808080] flex items-center text-[9px] px-2 py-0.5 gap-3">
        <span>Pronto</span>
        <div className="h-3 w-px bg-[#808080]" />
        <span>8 / 1.247 registros</span>
        <div className="h-3 w-px bg-[#808080]" />
        <span>Usr: JOAO_ADM</span>
        <div className="h-3 w-px bg-[#808080]" />
        <span>56kbps</span>
        <div className="ml-auto flex gap-2">
          <span>NUM</span>
          <span>CAPS</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Modern interface (Depois) ──────────────────────────────────── */
function NewInterface() {
  const bars = [42, 68, 55, 85, 62, 94, 78];
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  return (
    <div className="w-full h-full bg-[#080c18] text-white font-sans select-none p-4 overflow-hidden">
      {/* Nav */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg bg-linear-to-br from-cyan-400 to-indigo-600 flex items-center justify-center text-xs font-bold"
            style={{ boxShadow: "0 0 12px rgba(34,211,238,0.4)" }}
          >
            N
          </div>
          <span className="text-sm font-semibold">Elephens · Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px #34d399" }} />
          <span className="text-[11px] text-gray-400">Online</span>
          <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-[11px] text-cyan-300">
            JM
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { label: "Receita / mês", value: "R$ 48.290", pct: "+23%" },
          { label: "Pedidos",        value: "1.247",      pct: "+8%"  },
          { label: "Satisfação",     value: "98,7%",      pct: "+2%"  },
        ].map((m) => (
          <div key={m.label} className="bg-white/5 border border-white/10 rounded-xl p-2.5">
            <p className="text-[10px] text-gray-400 mb-1">{m.label}</p>
            <p className="text-sm font-bold leading-none mb-1">{m.value}</p>
            <span className="text-[10px] text-emerald-400">{m.pct} mês</span>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] font-semibold">Vendas — últimos 7 dias</span>
          <span className="text-[10px] text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">● Ao vivo</span>
        </div>
        <div className="flex items-end gap-1.5 h-14">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-linear-to-t from-indigo-600 to-cyan-400"
              style={{ height: `${h}%`, opacity: 0.85 }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          {days.map((d) => (
            <span key={d} className="text-[9px] text-gray-500">{d}</span>
          ))}
        </div>
      </div>

      {/* Activity feed */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-3">
        <p className="text-[11px] font-semibold mb-2">Atividade recente</p>
        {[
          { dot: "bg-emerald-400", text: "Pedido #1247 aprovado automaticamente", time: "agora"  },
          { dot: "bg-cyan-400",    text: "Relatório mensal gerado com 1 clique",   time: "2 min" },
          { dot: "bg-indigo-400",  text: "Integração Pix sincronizada",             time: "8 min" },
        ].map((a, i) => (
          <div key={i} className="flex items-center gap-2 py-0.75">
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${a.dot}`} />
            <span className="text-[10px] text-gray-300 flex-1 truncate">{a.text}</span>
            <span className="text-[9px] text-gray-500 shrink-0">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Before / After slider ──────────────────────────────────────── */
function BeforeAfterSlider() {
  const [position,  setPosition]  = useState(65);
  const [isDragging, setIsDragging] = useState(false);
  const [isHinting,  setIsHinting]  = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const clamp = (v: number) => Math.min(Math.max(v, 5), 95);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    setPosition(clamp(((clientX - left) / width) * 100));
  }, []);

  /* mouse + touch drag */
  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (isDragging) updatePos(e.clientX); };
    const onUp   = () => setIsDragging(false);
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging) { e.preventDefault(); updatePos(e.touches[0].clientX); }
    };

    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mouseup",    onUp);
    window.addEventListener("touchmove",  onTouchMove, { passive: false });
    window.addEventListener("touchend",   onUp);
    return () => {
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseup",    onUp);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("touchend",   onUp);
    };
  }, [isDragging, updatePos]);

  /* Hint sweep on mount: show old → sweep to reveal new → settle */
  useEffect(() => {
    let cancelled = false;
    const t1 = setTimeout(() => { if (!cancelled) setPosition(78); }, 600);
    const t2 = setTimeout(() => { if (!cancelled) setPosition(30); }, 1200);
    const t3 = setTimeout(() => {
      if (!cancelled) { setPosition(62); setIsHinting(false); }
    }, 2100);
    return () => { cancelled = true; [t1, t2, t3].forEach(clearTimeout); };
  }, []);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setIsHinting(false);
  };

  const ease = isHinting ? "0.55s ease-in-out" : undefined;

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden"
      style={{ height: 460, cursor: isDragging ? "col-resize" : "default", userSelect: "none" }}
    >
      {/* Full-size old interface in background */}
      <div className="absolute inset-0">
        <OldInterface />
      </div>

      {/* New interface clipped to the RIGHT of the divider */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 0 0 ${position}%)`,
          transition: ease ? `clip-path ${ease}` : undefined,
        }}
      >
        <NewInterface />
      </div>

      {/* Vertical divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white pointer-events-none"
        style={{
          left: `${position}%`,
          transform: "translateX(-50%)",
          boxShadow: "0 0 12px rgba(255,255,255,0.55)",
          transition: ease ? `left ${ease}` : undefined,
        }}
      />

      {/* Drag handle */}
      <div
        className="absolute top-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-2xl flex items-center justify-center cursor-col-resize"
        style={{
          left: `${position}%`,
          transform: "translateX(-50%) translateY(-50%)",
          touchAction: "none",
          transition: ease ? `left ${ease}` : undefined,
        }}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      >
        <HiChevronLeft  className="text-gray-500 text-lg -mr-0.5" />
        <HiChevronRight className="text-gray-500 text-lg -ml-0.5" />
      </div>

      {/* "Antes" label */}
      <div
        className="absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-widest text-red-400 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded pointer-events-none"
        style={{ opacity: position > 15 ? 1 : 0, transition: "opacity 0.3s" }}
      >
        Antes
      </div>

      {/* "Depois" label */}
      <div
        className="absolute top-3 right-3 z-10 text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded pointer-events-none"
        style={{ opacity: position < 85 ? 1 : 0, transition: "opacity 0.3s" }}
      >
        Depois
      </div>
    </div>
  );
}

/* ─── Section wrapper ────────────────────────────────────────────── */
export default function ComparisonSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-indigo-900/5 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header copy */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-nuvdev-cyan">
            Transformação visual
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4 leading-tight">
            Da tela de pesadelo
            <br />
            <span className="gradient-text">ao painel dos sonhos</span>
          </h2>
          <p className="text-nuvdev-text-muted max-w-lg mx-auto text-sm sm:text-base">
            Arraste a linha e veja como a Elephens transforma sistemas legados em
            interfaces modernas, rápidas e intuitivas.
          </p>
        </motion.div>

        {/* Slider card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-white/10 overflow-hidden"
        >
          <BeforeAfterSlider />
        </motion.div>

        {/* Hint label */}
        <motion.p
          className="text-center text-sm text-gray-500 mt-5 flex items-center justify-center gap-1"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
        >
          <HiChevronLeft />
          Arraste a linha para revelar o novo sistema
          <HiChevronRight />
        </motion.p>
      </div>
    </section>
  );
}
