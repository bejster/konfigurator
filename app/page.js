"use client";

import { useState } from "react";

const SIGNALS = [
  "Niższe libido",
  "Brain fog, ciężko się skupić",
  "Tłuszcz na brzuchu nie schodzi",
  "Brak energii mimo snu",
  "Ciągnie mnie do cukru / junk foodu",
  "Drażliwość, krótki lont",
  "Budzę się zmęczony",
  "Po weekendzie potrzebuję 2-3 dni żeby wrócić",
];

const PROBLEMS = [
  {
    id: "nie_wiem_co_jesc",
    name: "Nie wiem co jeść",
    desc: "Dieta nie trzyma, jem chaotycznie, nie mam systemu.",
  },
  {
    id: "trening_bez_efektow",
    name: "Trenuję ale nie widzę efektów",
    desc: "Chodzę na siłownię ale nic się nie zmienia.",
  },
  {
    id: "weekendy_niszcza",
    name: "Weekendy niszczą mi progres",
    desc: "W tygodniu ogarniam, w weekend wszystko się sypie.",
  },
  {
    id: "gasne_po_15",
    name: "Gasnę po 15:00, zero fokusu",
    desc: "Rano jeszcze jakoś, po południu jestem bezużyteczny.",
  },
  {
    id: "suplementy_losowo",
    name: "Biorę losowe rzeczy z neta albo nic",
    desc: "Nie wiem co działa, co jest marketingiem, co ma sens.",
  },
  {
    id: "badania_nie_wiem",
    name: "Mam wyniki badań ale nie wiem co z nimi",
    desc: "Lekarz mówi że jest ok, a ja czuję że nie jest.",
  },
  {
    id: "potrzebuje_kontaktu",
    name: "Potrzebuję kogoś kto reaguje na bieżąco",
    desc: "Sam nie ogarniam, potrzebuję żeby ktoś to pilnował ze mną.",
  },
  {
    id: "chaos_zyciowy",
    name: "Moje życie jest nieprzewidywalne",
    desc: "Zmienne godziny, wyjazdy, imprezy. Nie da się tego zaplanować z góry.",
  },
  {
    id: "wracam_po_przerwie",
    name: "Wracam po dłuższej przerwie",
    desc: "Kiedyś trenowałem, teraz chcę wrócić ale nie wiem od czego zacząć.",
  },
  {
    id: "chce_zeby_ktos_zarzadzal",
    name: "Chcę żeby ktoś tym zarządzał za mnie",
    desc: "Nie chcę myśleć co jeść, kiedy trenować. Chcę otwierać telefon i robić.",
  },
  {
    id: "sen_do_bani",
    name: "Źle sypiam",
    desc: "Kładę się zmęczony, budzę się zmęczony. Albo nie mogę zasnąć.",
  },
  {
    id: "hormony_cos_nie_gra",
    name: "Czuję że coś nie gra hormonalnie",
    desc: "Libido, energia, nastrój. Coś się zmieniło i nie wiem dlaczego.",
  },
];

export default function Home() {
  const [signals, setSignals] = useState(new Set());
  const [problems, setProblems] = useState(new Set());
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const toggleSignal = (s) => {
    setSignals((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  };

  const toggleProblem = (id) => {
    setProblems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const generateSummary = () => {
    const lines = [];
    lines.push("Cześć, oto moja sytuacja:");
    if (name) {
      lines.push("");
      lines.push("Imię: " + name);
    }
    if (signals.size > 0) {
      lines.push("");
      lines.push("Sygnały z ciała:");
      signals.forEach((s) => lines.push("  " + s));
    }
    if (problems.size > 0) {
      lines.push("");
      lines.push("Co chcę ogarnąć:");
      PROBLEMS.filter((p) => problems.has(p.id)).forEach((p) =>
        lines.push("  " + p.name)
      );
    }
    if (note.trim()) {
      lines.push("");
      lines.push("Dodatkowe info: " + note.trim());
    }
    lines.push("");
    lines.push("---");
    lines.push("Wysłane z @hantleiTalerz");
    return lines.join("\n");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateSummary());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const canGenerate = signals.size > 0 || problems.size > 0;
  const totalSelected = signals.size + problems.size;

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
          padding: "48px 24px 40px",
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
            fontSize: "clamp(26px, 6vw, 38px)",
            fontWeight: 700,
            color: "#FFF",
            margin: "0 0 16px 0",
            lineHeight: 1.2,
          }}
        >
          Pokaż mi co chcesz ogarnąć
        </h1>
        <p
          style={{
            color: "#777",
            fontSize: "15px",
            maxWidth: "440px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Zaznacz to co Cię dotyczy. Wyślij mi wynik w DM, a ja powiem Ci
          czy i jak mogę pomóc.
        </p>
      </div>

      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "0 16px" }}>
        {/* NAME */}
        <div style={{ padding: "32px 0 8px" }}>
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
            Jak masz na imię?
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

        {/* SIGNALS */}
        <div style={{ padding: "28px 0 8px" }}>
          <label
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "3px",
              color: "#666",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "6px",
            }}
          >
            Co czujesz w ciele?
          </label>
          <p
            style={{
              fontSize: "12px",
              color: "#444",
              margin: "0 0 14px 0",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Zaznacz wszystko co Cię dotyczy
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {SIGNALS.map((s) => {
              const active = signals.has(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleSignal(s)}
                  style={{
                    padding: "10px 18px",
                    background: active ? "#C0392B" : "#141414",
                    color: active ? "#FFF" : "#999",
                    border: active ? "1px solid #C0392B" : "1px solid #222",
                    borderRadius: "100px",
                    fontSize: "13px",
                    fontWeight: active ? 600 : 400,
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* PROBLEMS */}
        <div style={{ padding: "32px 0 8px" }}>
          <label
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "3px",
              color: "#666",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "6px",
            }}
          >
            Co chcesz ogarnąć?
          </label>
          <p
            style={{
              fontSize: "12px",
              color: "#444",
              margin: "0 0 14px 0",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Zaznacz wszystko co do Ciebie pasuje
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            {PROBLEMS.map((p) => {
              const active = problems.has(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => toggleProblem(p.id)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                    padding: "13px 16px",
                    background: active ? "#151515" : "#0C0C0C",
                    border: active
                      ? "1px solid #E8A83844"
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
                        ? "2px solid #E8A838"
                        : "2px solid #2A2A2A",
                      background: active ? "#E8A838" : "transparent",
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
                      {p.name}
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
                      {p.desc}
                    </div>
                  </div>
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
              marginBottom: "6px",
            }}
          >
            Chcesz coś dodać?
          </label>
          <p
            style={{
              fontSize: "12px",
              color: "#444",
              margin: "0 0 14px 0",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Twój grafik, tryb życia, ile imprezujesz, cokolwiek mi pomoże
          </p>
          <textarea
            placeholder="Np. pracuję w korpo, imprezuję co weekend, chcę zrzucić 8kg..."
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

        {/* CTA */}
        <div style={{ padding: "32px 0 20px" }}>
          {totalSelected > 0 && (
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
              {totalSelected}{" "}
              {totalSelected === 1
                ? "punkt"
                : totalSelected < 5
                  ? "punkty"
                  : "punktów"} zaznaczonych
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
              ? "WYŚLIJ MI TO \u2192"
              : "Zaznacz co Cię dotyczy"}
          </button>
        </div>

        {/* FOOTER */}
        <div style={{ textAlign: "center", padding: "8px 0 56px" }}>
          <p
            style={{
              color: "#444",
              fontSize: "13px",
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: "12px",
              lineHeight: 1.6,
            }}
          >
            Skopiuj wynik i wrzuć mi w DM. Odpiszę osobiście.
          </p>
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
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "18px",
                fontWeight: 700,
                color: "#FFF",
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
                lineHeight: 1.5,
              }}
            >
              Skopiuj i wklej mi w DM. Powiem Ci czy i jak mogę pomóc.
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
                {copied ? "SKOPIOWANO \u2713" : "KOPIUJ I WRZUĆ W DM"}
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
