"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineDesktopComputer,
  HiOutlineCog,
  HiOutlineDocumentText,
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
  HiOutlineShoppingCart,
  HiOutlineGlobeAlt,
  HiOutlineCode,
  HiOutlineDeviceMobile,
} from "react-icons/hi";
import { MdRocketLaunch } from "react-icons/md";

// Deterministic burst positions — no Math.random (avoids hydration mismatch)
const PARTICLES = [
  { x: 40, y: 0, s: 5 },
  { x: 28, y: 28, s: 3 },
  { x: 0, y: 40, s: 4 },
  { x: -28, y: 28, s: 5 },
  { x: -40, y: 0, s: 3 },
  { x: -28, y: -28, s: 4 },
  { x: 0, y: -40, s: 5 },
  { x: 28, y: -28, s: 3 },
  { x: 20, y: 35, s: 4 },
  { x: -20, y: 35, s: 5 },
  { x: -35, y: -20, s: 3 },
  { x: 35, y: -20, s: 4 },
];

const OLD_CARDS = [
  {
    id: 0,
    name: "GestorPro 2.0",
    sub: "© 2003 • Licença expirada",
    Icon: HiOutlineDesktopComputer,
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    text: "text-red-400",
    particle: "#ef4444",
  },
  {
    id: 1,
    name: "SistemMax NT",
    sub: "Build 1.9.4 • Sem suporte técnico",
    Icon: HiOutlineCog,
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    particle: "#f97316",
  },
  {
    id: 2,
    name: "controle_final_revisado2.xls",
    sub: "Excel 97-2003 • Arquivo corrompido",
    Icon: HiOutlineDocumentText,
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/10",
    text: "text-yellow-500",
    particle: "#eab308",
  },
];

const SOLUTIONS = [
  { label: "PDV moderno", Icon: HiOutlineShoppingCart },
  { label: "Landing page", Icon: HiOutlineGlobeAlt },
  { label: "Sistema sob medida", Icon: HiOutlineCode },
  { label: "App & automação", Icon: HiOutlineDeviceMobile },
];

export default function SystemAnimation() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [removedSet, setRemovedSet] = useState<Set<number>>(new Set());
  const [burstId, setBurstId] = useState<number | null>(null);
  const [showNuvDev, setShowNuvDev] = useState(false);
  const [solutionCount, setSolutionCount] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    let dead = false;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    (async () => {
      // Reset all state
      setVisibleCount(0);
      setShaking(false);
      setRemovedSet(new Set());
      setBurstId(null);
      setShowNuvDev(false);
      setSolutionCount(0);

      await wait(600);
      if (dead) return;

      // Cards appear one by one
      setVisibleCount(1);
      await wait(800);
      if (dead) return;
      setVisibleCount(2);
      await wait(800);
      if (dead) return;
      setVisibleCount(3);
      await wait(1500);
      if (dead) return;

      // All cards shake
      setShaking(true);
      await wait(1200);
      if (dead) return;

      // Cards explode one by one
      for (const id of [0, 1, 2]) {
        setBurstId(id);
        setRemovedSet((prev) => new Set([...prev, id]));
        await wait(120);
        if (dead) return;
        setBurstId(null);
        await wait(650);
        if (dead) return;
      }

      setShaking(false);
      await wait(900);
      if (dead) return;

      // Elephens card springs in
      setShowNuvDev(true);
      await wait(700);
      if (dead) return;

      // Solutions appear in stagger
      for (let i = 1; i <= 4; i++) {
        setSolutionCount(i);
        await wait(220);
        if (dead) return;
      }

      // Hold, then loop
      await wait(5500);
      if (dead) return;
      setCycleKey((k) => k + 1);
    })();

    return () => {
      dead = true;
    };
  }, [cycleKey]);

  return (
    <div className="w-full select-none" aria-hidden="true">
      {/* ── ANTES ── */}
      {removedSet.size < OLD_CARDS.length && (
        <p className="text-[10px] font-bold text-red-400/50 uppercase tracking-widest mb-2.5">
          Antes
        </p>
      )}

      <div className="relative flex flex-col gap-3 mb-5">
        <AnimatePresence>
          {OLD_CARDS.filter(
            (c) => c.id < visibleCount && !removedSet.has(c.id)
          ).map((card) => (
            <motion.div
              key={card.id}
              className="relative"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{
                scale: 1.3,
                opacity: 0,
                transition: { duration: 0.22, ease: "easeIn" },
              }}
              transition={{ duration: 0.32, ease: "easeOut" }}
            >
              {/* Inner wrapper: handles shake independently */}
              <motion.div
                animate={
                  shaking
                    ? { x: [0, -4, 4, -3, 3, -2, 2, -1, 1, 0, -4] }
                    : { x: 0 }
                }
                transition={
                  shaking
                    ? { duration: 0.44, repeat: Infinity, ease: "linear" }
                    : { duration: 0 }
                }
              >
                {/* Particle burst — stays centered on card */}
                <AnimatePresence>
                  {burstId === card.id && (
                    <div
                      className="absolute inset-0 pointer-events-none z-20"
                      style={{ overflow: "visible" }}
                    >
                      {PARTICLES.map((p, i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full"
                          style={{
                            top: "50%",
                            left: "50%",
                            width: p.s,
                            height: p.s,
                            backgroundColor: card.particle,
                          }}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
                          transition={{ duration: 0.52, ease: "easeOut" }}
                        />
                      ))}
                    </div>
                  )}
                </AnimatePresence>

                {/* Card face */}
                <div
                  className={`flex items-center gap-3 bg-nuvdev-card border ${card.border} rounded-xl px-4 py-3`}
                >
                  <div
                    className={`w-9 h-9 shrink-0 rounded-lg ${card.bg} flex items-center justify-center`}
                  >
                    <card.Icon className={`${card.text} text-lg`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white truncate">
                      {card.name}
                    </p>
                    <p className={`text-[11px] ${card.text} opacity-75 truncate`}>
                      {card.sub}
                    </p>
                  </div>
                  <HiOutlineExclamationCircle
                    className={`${card.text} text-xl shrink-0`}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── DEPOIS ── */}
      <AnimatePresence>
        {showNuvDev && (
          <motion.div
            key="after-zone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-[10px] font-bold text-nuvdev-cyan/50 uppercase tracking-widest mb-2.5">
              Depois
            </p>

            {/* NuvDev card — spring entrance */}
            <motion.div
              initial={{ y: 44, opacity: 0, scale: 0.82 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 290, damping: 21 }}
              className="flex items-center gap-3 bg-nuvdev-card border border-nuvdev-cyan/40 rounded-xl px-4 py-3 mb-3 shadow-lg shadow-nuvdev-cyan/10"
            >
              <div className="w-9 h-9 shrink-0 rounded-lg bg-nuvdev-cyan/15 flex items-center justify-center">
                <MdRocketLaunch className="text-nuvdev-cyan text-lg" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Elephens</p>
                <p className="text-[11px] text-nuvdev-cyan">
                  Cloud • Mobile • Integrado
                </p>
              </div>
              <HiOutlineCheckCircle className="text-nuvdev-cyan text-xl ml-auto shrink-0" />
            </motion.div>

            {/* Solutions — stagger */}
            <div className="grid grid-cols-2 gap-2">
              <AnimatePresence>
                {SOLUTIONS.slice(0, solutionCount).map((sol) => (
                  <motion.div
                    key={sol.label}
                    initial={{ opacity: 0, y: 12, scale: 0.88 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="flex items-center gap-2 bg-nuvdev-cyan/5 border border-nuvdev-cyan/20 rounded-lg px-3 py-2.5"
                  >
                    <sol.Icon className="text-nuvdev-cyan text-sm shrink-0" />
                    <span className="text-[11px] text-white font-medium leading-tight">
                      {sol.label}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
