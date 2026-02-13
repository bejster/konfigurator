"use client";

import { useState } from "react";

const OFFER_ELEMENTS = [
  {
    id: "diagnostyka",
    name: 'Diagnostyka "Forma + Mózg + Weekend"',
    desc: "Rozkładam na części co Cię sabotuje. Sen, energia, weekend, głowa.",
    tier: "solo",
  },
  {
    id: "zywienie",
    name: "System żywieniowy",
    desc: "Jedzenie które działa z Twoim życiem. Nie z Excelem.",
    tier: "solo",
  },
  {
    id: "trening",
    name: "System treningowy",
    desc: "Konkretny plan. Wchodzisz, robisz, wychodzisz. Bez kombinowania.",
    tier: "solo",
  },
  {
    id: "reset",
    name: 'Protokół "Reset po Weekendzie"',
    desc: "Sobota była ciężka? Poniedziałek nie musi być stracony.",
    tier: "solo",
  },
  {
    id: "korekta_tyg",
    name: "Korekta tygodniowa",
    desc: "Raz w tygodniu sprawdzam co działa, co nie. Korygujemy na bieżąco.",
    tier: "solo",
  },
  {
    id: "baza_protokolow",
    name: "Baza protokołów",
    desc: "Gotowe schematy na podróż, deadline, kiepski sen. Otwierasz i robisz.",
    tier: "solo",
  },
  {
    id: "codzienny_kontakt",
    name: "Codzienny kontakt",
    desc: "Piszesz kiedy potrzebujesz. Odpisuję codziennie.",
    tier: "standard",
  },
  {
    id: "korekta_codzienna",
    name: "Korekta codzienna",
    desc: "Coś poszło nie tak? Łapiemy to dziś, nie za tydzień.",
    tier: "standard",
  },
  {
    id: "protokoly_sytuacyjne",
    name: "Protokoły sytuacyjne",
    desc: "Wyjazd, wesele, deadline — dostajesz plan pod konkretną sytuację.",
    tier: "standard",
  },
  {
    id: "mozg_wydajnosc",
    name: '"Mózg w wydajności"',
    desc: "Kiedy jeść, kiedy kawa, kiedy trening — żebyś nie gasł po 15:00.",
    tier: "standard",
  },
  {
    id: "suplementacja",
    name: "Suplementacja",
    desc: "Dostajesz to co realnie działa. Bez losowych stacków z internetu.",
    tier: "standard",
  },
  {
    id: "start_24h",
    name: "Start w 24h",
    desc: "Decyzja wieczorem, rano masz wszystko gotowe do działania.",
    tier: "premium",
  },
  {
    id: "jadlospisy",
    name: "Gotowe jadłospisy + lista zakupów",
    desc: "Otwierasz telefon — wiesz co jeść i co kupić. Nie musisz myśleć.",
    tier: "premium",
  },
  {
    id: "odpowiedz_2h",
    name: "Odpowiedź do 2h",
    desc: "Piszesz — masz odpowiedź w ciągu dwóch godzin. Nie wieczorem.",
    tier: "premium",
  },
  {
    id: "michal_pisze",
    name: "Michał pisze pierwszy",
    desc: "Nie musisz pamiętać. Ja się odzywam, sprawdzam, przypominam.",
    tier: "premium",
  },
  {
    id: "voice_tyg",
    name: "Podsumowanie głosowe co tydzień",
    desc: "Krótki voice: co poszło, co dalej, co poprawić. Konkrety.",
    tier: "premium",
  },
  {
    id: "protokoly_person",
    name: "Protokoły spersonalizowane",
    desc: "Prezentacja w czwartek? Dostajesz co jeść, jak spać, co wziąć.",
    tier: "premium",
  },
  {
    id: "notion_kalendarz",
    name: "Kalendarz tygodnia w Notion",
    desc: "Cały tydzień rozpisany godzina po godzinie. Otwierasz i robisz.",
    tier: "premium",
  },
  {
    id: "suple_person",
    name: "Suplementacja spersonalizowana",
    desc: "Stack dopasowany pod Ciebie. Energia, sen, hormony — z dawkami i timingiem.",
    tier: "premium",
  },
  {
    id: "badania_krwi",
    name: "Interpretacja badań krwi",
    desc: "Wysyłasz wyniki — tłumaczę co znaczą i co zmieniamy. Co kwartał.",
    tier: "premium",
  },
  {
    id: "technika_video",
    name: "Analiza techniki video",
    desc: "Nagrywasz ćwiczenie, dostajesz korektę. Bez czekania na siłowni.",
    tier: "premium",
  },
];

const BUDGET_OPTIONS = [
  { label: "800–1 200 zł / msc", value: "800-1200" },
  { label: "1 200–1 600 zł / msc", value: "1200-1600" },
  { label: "1 600–2 200 zł / msc", value: "1600-2200" },
  { label: "2 200+ zł / msc", value: "2200+" },
  { label: "Nie wiem jeszcze — pokaż opcje", value: "nie-wiem" },
];

const TIER_META = {
  solo: {
    label: "SOLO",
    color: "#8B8B8B",
    tagline: "Baza. System + korekta raz w tygodniu. Sam jedziesz.",
  },
  standard: {
    label: "STANDARD",
    color: "#E8A838",
    tagline: "Codzienny kontakt. Reaguję na bieżąco. Nie zostajesz sam.",
  },
  premium: {
    label: "PREMIUM",
    color: "#C0392B",
    tagline: "Full service. Ja zarządzam, Ty robisz. Zero myślenia.",
  },
};

const GOALS = [
  "Sylwetka / redukcja",
  "Energia w ciągu dnia",
  "Sen i regeneracja",
  "Forma mimo imprez",
  "Powrót po dłuższej przerwie",
  "Mózg i produktywność",
];

export default function Home() {
  const [selected, setSelected] = useState(new Set());
  const [budget, setBudget] = useState(null);
  const [goals, setGoals] = useState(new Set());
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const toggleItem = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleGoal = (g) => {
    setGoals((prev) => {
      const next = new Set(prev);
      if (next.has(g)) next.delete(g);
      else next.add(g);
      return next;
    });
  };

  const selectAllTier = (tier) => {
    const tierItems = OFFER_ELEMENTS.filter((el) => el.tier === tier);
    const allSelected = tierItems.every((el) => selected.has(el.id));
    setSelected((prev) => {
      const next = new Set(prev);
      tierItems.forEach((el) => {
        if (allSelected) next.delete(el.id);
        else next.add(el.id);
      });
      return next;
    });
  };

  const generateSummary = () => {
    const lines = [];
    lines.push("KONFIGURATOR — Hantle i Talerz");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    if (name) lines.push("Imię: " + name);
    lines.push("");
    if (goals.size > 0) {
      lines.push("CO CHCĘ OSIĄGNĄĆ:");
      goals.forEach((g) => lines.push("  → " + g));
      lines.push("");
    }
    lines.push("CO MNIE INTERESUJE:");
    if (selected.size === 0) {
      lines.push("  (nie zaznaczono)");
    } else {
      const tiers = ["solo", "standard", "premium"];
      tiers.forEach((tier) => {
        const items = OFFER_ELEMENTS.filter(
          (el) => el.tier === tier && selected.has(el.id)
        );
        if (items.length > 0) {
          lines.push("  [" + TIER_META[tier].label + "]");
          items.forEach((el) => lines.push("  → " + el.name));
        }
      });
    }
    lines.push("");
    const budgetLabel = budget
      ? BUDGET_OPTIONS.find((b) => b.value === budget)?.label
      : "(nie zaznaczono)";
    lines.push("BUDŻET MIESIĘCZNY: " + budgetLabel);
    if (note.trim()) {
      lines.push("");
      lines.push("DODATKOWE INFO: " + note.trim());
    }
    lines.push("");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("Wygenerowano z konfiguratora @hantleiTalerz");
    return lines.join("\n");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateSummary());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const canGenerate = selected.size > 0 || budget || goals.size > 0;
  const selectedCount = selected.size;
  const tierSections = ["solo", "standard", "premium"];

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    background: "#111",
    border: "1px solid #2A2A2A",
    borderRadius: "8px",
    color: "#FFF",
    fontSize: "15px",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* HEADER */}
      <div
        style={{
          background: "linear-gradient(180deg, #141414 0%, #0A0A0A 100%)",
          borderBottom: "1px solid #1F1F1F",
          padding: "48px 24px 36px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            letterSpacing: "4px",
            color: "#555",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          Hantle i Talerz
        </div>
        <h1
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(26px, 6vw, 40px)",
            fontWeight: 700,
            color: "#FFF",
            margin: "0 0 14px 0",
            lineHeight: 1.15,
          }}
        >
          Zbuduj swoją ofertę
        </h1>
        <p
          style={{
            color: "#777",
            fontSize: "15px",
            maxWidth: "440px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Zaznacz to co Cię interesuje. Na końcu skopiuj i wrzuć mi w DM —
          dogadamy szczegóły.
        </p>
      </div>

      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "0 16px" }}>
        {/* NAME */}
        <div style={{ padding: "28px 0 8px" }}>
          <label
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "3px",
              color: "#666",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "14px",
            }}
          >
            Twoje imię
          </label>
          <input
            type="text"
            placeholder="Wpisz..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#444")}
            onBlur={(e) => (e.target.style.borderColor = "#2A2A2A")}
          />
        </div>

        {/* GOALS */}
        <div style={{ padding: "28px 0 8px" }}>
          <label
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "3px",
              color: "#666",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "14px",
            }}
          >
            Co chcesz osiągnąć?
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {GOALS.map((g) => {
              const active = goals.has(g);
              return (
                <button
                  key={g}
                  onClick={() => toggleGoal(g)}
                  style={{
                    padding: "10px 18px",
                    background: active ? "#E8A838" : "#141414",
                    color: active ? "#000" : "#999",
                    border: active ? "1px solid #E8A838" : "1px solid #222",
                    borderRadius: "100px",
                    fontSize: "13px",
                    fontWeight: active ? 600 : 400,
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        {/* TIER SECTIONS */}
        {tierSections.map((tier) => {
          const meta = TIER_META[tier];
          const items = OFFER_ELEMENTS.filter((el) => el.tier === tier);
          const allSelected = items.every((el) => selected.has(el.id));

          return (
            <div key={tier} style={{ padding: "28px 0 8px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "6px",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: meta.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "12px",
                    letterSpacing: "3px",
                    color: meta.color,
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  {meta.label}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: meta.color + "33",
                  }}
                />
                <button
                  onClick={() => selectAllTier(tier)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    color: allSelected ? meta.color : "#555",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px 8px",
                    transition: "color 0.15s",
                  }}
                >
                  {allSelected ? "odznacz" : "zaznacz"} wszystko
                </button>
              </div>

              <p
                style={{
                  fontSize: "13px",
                  color: "#444",
                  margin: "0 0 14px 22px",
                  fontStyle: "italic",
                  lineHeight: 1.4,
                }}
              >
                {meta.tagline}
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                {items.map((el) => {
                  const active = selected.has(el.id);
                  return (
                    <button
                      key={el.id}
                      onClick={() => toggleItem(el.id)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "14px",
                        padding: "13px 16px",
                        background: active ? "#151515" : "#0C0C0C",
                        border: active
                          ? "1px solid " + meta.color + "44"
                          : "1px solid #161616",
                        borderRadius: "10px",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        textAlign: "left",
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "5px",
                          border: active
                            ? "2px solid " + meta.color
                            : "2px solid #2A2A2A",
                          background: active ? meta.color : "transparent",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: "1px",
                          transition: "all 0.15s",
                        }}
                      >
                        {active && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M2.5 6L5 8.5L9.5 3.5"
                              stroke="#000"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: active ? 600 : 400,
                            color: active ? "#FFF" : "#BBB",
                            lineHeight: 1.4,
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          {el.name}
                        </div>
                        <div
                          style={{
                            fontSize: "12.5px",
                            color: "#555",
                            marginTop: "2px",
                            lineHeight: 1.4,
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          {el.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* BUDGET */}
        <div style={{ padding: "28px 0 8px" }}>
          <label
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "3px",
              color: "#666",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Ile chcesz w to włożyć?
          </label>
          <p
            style={{
              fontSize: "12px",
              color: "#444",
              margin: "0 0 14px 0",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Miesięcznie
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            {BUDGET_OPTIONS.map((opt) => {
              const active = budget === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setBudget(active ? null : opt.value)}
                  style={{
                    padding: "14px 16px",
                    background: active ? "#151515" : "#0C0C0C",
                    border: active
                      ? "1px solid #E8A83844"
                      : "1px solid #161616",
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      border: active
                        ? "2px solid #E8A838"
                        : "2px solid #2A2A2A",
                      background: active ? "#E8A838" : "transparent",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.15s",
                    }}
                  >
                    {active && (
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "#000",
                        }}
                      />
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: active ? 600 : 400,
                      color: active ? "#FFF" : "#999",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* NOTE */}
        <div style={{ padding: "28px 0 8px" }}>
          <label
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "3px",
              color: "#666",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Coś jeszcze?
          </label>
          <p
            style={{
              fontSize: "12px",
              color: "#444",
              margin: "0 0 14px 0",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Opcjonalne — grafik, tryb życia, cel
          </p>
          <textarea
            placeholder="Np. pracuję na zmiany, imprezuję co weekend, chcę schudnąć 8kg..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            style={{
              ...inputStyle,
              resize: "vertical",
              minHeight: "80px",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#444")}
            onBlur={(e) => (e.target.style.borderColor = "#2A2A2A")}
          />
        </div>

        {/* COUNTER + CTA */}
        <div style={{ padding: "32px 0 20px" }}>
          {selectedCount > 0 && (
            <div
              style={{
                textAlign: "center",
                marginBottom: "16px",
                fontFamily: "'Space Mono', monospace",
                fontSize: "12px",
                color: "#555",
                letterSpacing: "1px",
              }}
            >
              Zaznaczono: {selectedCount}{" "}
              {selectedCount === 1
                ? "element"
                : selectedCount < 5
                  ? "elementy"
                  : "elementów"}
            </div>
          )}
          <button
            onClick={() => {
              if (canGenerate) setShowSummary(true);
            }}
            disabled={!canGenerate}
            style={{
              width: "100%",
              padding: "20px",
              background: canGenerate
                ? "linear-gradient(135deg, #E8A838 0%, #D4922A 100%)"
                : "#151515",
              color: canGenerate ? "#000" : "#333",
              border: canGenerate ? "none" : "1px solid #1F1F1F",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              cursor: canGenerate ? "pointer" : "default",
              letterSpacing: "0.5px",
              transition: "all 0.25s",
            }}
          >
            {canGenerate
              ? "GOTOWE — KOPIUJ I PISZ NA DM →"
              : "Zaznacz co Cię interesuje"}
          </button>
        </div>

        {/* FOOTER */}
        <div style={{ textAlign: "center", padding: "8px 0 56px" }}>
          <div
            style={{
              color: "#333",
              fontSize: "12px",
              fontFamily: "'Space Mono', monospace",
              marginBottom: "8px",
            }}
          >
            Skopiuj podsumowanie i wrzuć w DM
          </div>
          <a
            href="https://instagram.com/hantleiTalerz"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "10px 24px",
              background: "#151515",
              border: "1px solid #2A2A2A",
              borderRadius: "100px",
              color: "#E8A838",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              textDecoration: "none",
              transition: "all 0.15s",
            }}
          >
            @hantleiTalerz
          </a>
        </div>
      </div>

      {/* SUMMARY MODAL */}
      {showSummary && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.88)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "16px",
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setShowSummary(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#111",
              border: "1px solid #2A2A2A",
              borderRadius: "16px",
              padding: "32px 24px",
              maxWidth: "520px",
              width: "100%",
              maxHeight: "85vh",
              overflow: "auto",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                letterSpacing: "3px",
                color: "#E8A838",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Twoje podsumowanie
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "#555",
                margin: "0 0 20px 0",
                lineHeight: 1.4,
              }}
            >
              Skopiuj tekst i wklej w DM na Instagramie
            </p>
            <pre
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                color: "#CCC",
                lineHeight: 1.7,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                background: "#0A0A0A",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid #1A1A1A",
                margin: "0 0 24px 0",
              }}
            >
              {generateSummary()}
            </pre>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleCopy}
                style={{
                  flex: 1,
                  padding: "16px",
                  background: copied
                    ? "#2D7D46"
                    : "linear-gradient(135deg, #E8A838 0%, #D4922A 100%)",
                  color: copied ? "#FFF" : "#000",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.25s",
                }}
              >
                {copied ? "SKOPIOWANO ✓" : "KOPIUJ TEKST"}
              </button>
              <button
                onClick={() => setShowSummary(false)}
                style={{
                  padding: "16px 20px",
                  background: "transparent",
                  color: "#555",
                  border: "1px solid #2A2A2A",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                }}
              >
                WRÓĆ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
