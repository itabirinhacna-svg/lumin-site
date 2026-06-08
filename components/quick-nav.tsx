"use client";

import { useEffect, useState } from "react";

type QuickNavItem = {
  label: string;
  href: string;
};

type QuickNavProps = {
  title?: string;
  items: QuickNavItem[];
};

export function QuickNav({ title = "Acesso rapido", items }: QuickNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(items[0]?.href ?? null);

  useEffect(() => {
    function handleHashChange() {
      if (window.location.hash) {
        setActiveHref(window.location.hash);
      }
    }

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  function handleNavigate(href: string) {
      if (href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          setActiveHref(href);
          if (!isPinned) {
            setIsOpen(false);
          }
          return;
        }
      }

    window.location.assign(href);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        style={{
          position: "fixed",
          right: 18,
          bottom: isPinned ? 92 : 20,
          zIndex: 60,
          minHeight: 56,
          minWidth: 56,
          borderRadius: 999,
          border: "1px solid rgba(197,139,0,.34)",
          background: "linear-gradient(135deg, rgba(197,139,0,.96), rgba(155,107,0,.96))",
          color: "#fff",
          padding: "0 18px",
          fontWeight: 800,
          boxShadow: "0 18px 40px rgba(2,6,23,.36)",
          cursor: "pointer",
        }}
      >
        {isOpen ? "Fechar menu" : "Abrir menu"}
      </button>

      {isOpen ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 55,
            background: "rgba(2,6,23,.56)",
          }}
          onClick={() => setIsOpen(false)}
        >
          <aside
            onClick={(event) => event.stopPropagation()}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "min(360px, 92vw)",
              background: "rgba(15,23,42,.98)",
              borderLeft: "1px solid rgba(255,255,255,.08)",
              boxShadow: "-18px 0 44px rgba(2,6,23,.34)",
              padding: "22px 16px 88px",
              display: "grid",
              alignContent: "start",
              gap: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div>
                <strong style={{ color: "#fff", fontSize: 18 }}>{title}</strong>
                <p style={{ margin: "6px 0 0", color: "#cbd5e1", fontSize: 14 }}>
                  Continue daqui sem precisar procurar.
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                <button type="button" onClick={() => setIsPinned((value) => !value)} style={buttonStyle}>
                  {isPinned ? "Desafixar" : "Fixar"}
                </button>
                <button type="button" onClick={() => setIsOpen(false)} style={buttonStyle}>
                  Fechar
                </button>
              </div>
            </div>

            <nav style={{ display: "grid", gap: 10, marginTop: 10 }}>
              {items.map((item, index) => {
                const isActive = activeHref === item.href;

                return (
                  <button
                    type="button"
                    key={item.href}
                    onClick={() => handleNavigate(item.href)}
                    style={{
                      minHeight: 54,
                      display: "grid",
                      justifyItems: "start",
                      gap: 2,
                      padding: "10px 14px",
                      borderRadius: 18,
                      border: `1px solid ${isActive ? "rgba(197,139,0,.28)" : "rgba(255,255,255,.08)"}`,
                      background: isActive
                        ? "linear-gradient(135deg, rgba(197,139,0,.18), rgba(197,139,0,.08))"
                        : "rgba(255,255,255,.03)",
                      color: "#fff",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: 12, color: "#f3cf6f", fontWeight: 800 }}>Etapa {index + 1}</span>
                    <span style={{ fontWeight: 800 }}>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      ) : null}
    </>
  );
}

const buttonStyle = {
  minHeight: 34,
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(255,255,255,.04)",
  color: "#fff",
  padding: "0 12px",
  fontWeight: 700,
  cursor: "pointer",
} as const;
