import { useState, useEffect, useCallback } from "react";

// ── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  bg:       "#F7F7F5",
  surface:  "#FFFFFF",
  border:   "#E2E2DE",
  text:     "#111110",
  muted:    "#888884",
  accent:   "#5B9E96",
  accentBg: "#EBF4F3",
  red:      "#C0392B",
  orange:   "#D47A30",
  green:    "#2E8B5A",
  tag:      "#EDEDEA",
};

// ── Global styles ─────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    height: 100%;
    background: ${T.bg};
    font-family: 'IBM Plex Mono', monospace;
    color: ${T.text};
  }

  .shell {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  /* ── Header ── */
  .header {
    padding: 16px 28px;
    border-bottom: 1px solid ${T.border};
    background: ${T.surface};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }
  .header-left { display: flex; align-items: baseline; gap: 14px; }
  .header-title {
    font-size: 12px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    display: flex; align-items: center; gap: 8px;
  }
  .header-sub { font-size: 11px; color: ${T.muted}; }
  .header-time { font-size: 11px; color: ${T.muted}; }

  .live-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: ${T.accent}; display: inline-block;
    animation: pulse 2.2s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.25} }

  /* ── Body ── */
  .body { display: flex; flex: 1; overflow: hidden; }

  /* ── Sidebar ── */
  .sidebar {
    width: 260px; flex-shrink: 0;
    border-right: 1px solid ${T.border};
    background: ${T.surface};
    display: flex; flex-direction: column;
  }

  .tab-bar { display: flex; border-bottom: 1px solid ${T.border}; }
  .tab {
    flex: 1; padding: 13px 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase;
    border: none; background: transparent;
    color: ${T.muted}; cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: color 0.15s, border-color 0.15s;
  }
  .tab.active { color: ${T.accent}; border-bottom-color: ${T.accent}; }
  .tab:hover:not(.active) { color: ${T.text}; }

  .feed { flex: 1; overflow-y: auto; padding: 10px 0; }
  .feed::-webkit-scrollbar { width: 3px; }
  .feed::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 2px; }

  /* ── Cards ── */
  .card {
    padding: 13px 16px;
    border-bottom: 1px solid ${T.border};
    cursor: pointer;
    transition: background 0.12s;
    border-left: 2px solid transparent;
  }
  .card:hover { background: ${T.accentBg}; }
  .card.selected { background: ${T.accentBg}; border-left-color: ${T.accent}; }

  .card-ticker {
    font-size: 13px; font-weight: 600;
    letter-spacing: 0.03em; margin-bottom: 3px;
    display: flex; align-items: center; gap: 7px;
  }
  .card-coin-img {
    width: 14px; height: 14px;
    border-radius: 50%; object-fit: cover;
  }
  .card-name {
    font-size: 10px; color: ${T.muted};
    white-space: nowrap; overflow: hidden;
    text-overflow: ellipsis; margin-bottom: 8px;
  }
  .card-footer { display: flex; justify-content: space-between; align-items: center; }

  .badge {
    font-size: 9px; font-weight: 500;
    padding: 2px 6px; border-radius: 3px;
    letter-spacing: 0.05em; text-transform: uppercase;
  }
  .badge-ipo    { background: #FFF0E6; color: ${T.orange}; }
  .badge-priced { background: #E9F5EE; color: ${T.green}; }
  .badge-crypto { background: ${T.accentBg}; color: ${T.accent}; }

  .countdown { font-size: 10px; font-weight: 500; color: ${T.muted}; }
  .countdown-soon  { color: ${T.orange}; }
  .countdown-today { color: ${T.red}; font-weight: 600; }
  .countdown-done  { color: ${T.green}; }
  .change-pos { color: ${T.green}; font-size: 10px; font-weight: 500; }
  .change-neg { color: ${T.red};   font-size: 10px; font-weight: 500; }

  .exchange-tag {
    display: inline-block; margin-top: 6px;
    font-size: 9px; background: ${T.tag};
    color: ${T.muted}; padding: 2px 5px; border-radius: 2px;
  }

  .feed-empty {
    padding: 36px 16px; text-align: center;
    font-size: 11px; color: ${T.muted}; line-height: 2;
  }

  /* ── Main panel ── */
  .main { flex: 1; overflow: hidden; display: flex; flex-direction: column; }

  .detail { flex: 1; overflow-y: auto; padding: 32px 36px; }
  .detail::-webkit-scrollbar { width: 3px; }
  .detail::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 2px; }

  .no-sel {
    height: 100%; display: flex;
    flex-direction: column; align-items: center;
    justify-content: center; color: ${T.muted};
    font-size: 12px; gap: 10px; text-align: center;
  }
  .no-sel-icon { font-size: 30px; opacity: 0.2; }

  /* ── Detail header ── */
  .d-ticker {
    font-size: 30px; font-weight: 600;
    letter-spacing: -0.02em; margin-bottom: 4px;
  }
  .d-name { font-size: 13px; color: ${T.muted}; margin-bottom: 20px; }
  .d-stats { display: flex; gap: 28px; flex-wrap: wrap; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid ${T.border}; }
  .stat-label { font-size: 9px; color: ${T.muted}; text-transform: uppercase; letter-spacing: 0.09em; margin-bottom: 3px; }
  .stat-value { font-size: 13px; font-weight: 500; }

  /* ── News ── */
  .news-head {
    font-size: 10px; text-transform: uppercase;
    letter-spacing: 0.1em; color: ${T.muted};
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 18px;
  }
  .news-head::after { content:''; flex:1; height:1px; background: ${T.border}; }

  .news-loading {
    display: flex; align-items: center; gap: 10px;
    font-size: 12px; color: ${T.muted}; padding: 16px 0;
  }
  .spinner {
    width: 13px; height: 13px;
    border: 2px solid ${T.border};
    border-top-color: ${T.accent};
    border-radius: 50%;
    animation: spin 0.75s linear infinite; flex-shrink: 0;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .news-body { font-size: 12px; line-height: 1.9; color: ${T.text}; white-space: pre-wrap; }
  .news-error { font-size: 11px; color: ${T.red}; padding: 10px 0; }
`;

// ── Mock IPO data (Nasdaq API has CORS — replace with your backend JSON) ──────
const MOCK_IPOS = [
  {
    type: "ipo", id: "ipo_SBET_2026-07-08",
    name: "SharpBet Technologies", ticker: "SBET",
    exchange: "NASDAQ", price_range: "14–16", shares: "5,000,000", date: "2026-07-08",
  },
  {
    type: "ipo", id: "ipo_NVTX_2026-07-10",
    name: "Novartex Bio", ticker: "NVTX",
    exchange: "NYSE", price_range: "18–22", shares: "8,200,000", date: "2026-07-10",
  },
  {
    type: "ipo", id: "ipo_AIQT_2026-07-15",
    name: "AIQ Technologies Corp", ticker: "AIQT",
    exchange: "NASDAQ", price_range: "24–28", shares: "12,000,000", date: "2026-07-15",
  },
  {
    type: "ipo", id: "ipo_GRNX_2026-07-22",
    name: "GreenX Energy", ticker: "GRNX",
    exchange: "NYSE", price_range: "11–13", shares: "6,500,000", date: "2026-07-22",
  },
  {
    type: "ipo_priced", id: "ipo_priced_LMNT_06292026",
    name: "Lument Finance Trust", ticker: "LMNT",
    exchange: "NYSE", price: "17.00", date: "06/29/2026",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function daysUntil(dateStr) {
  if (!dateStr || dateStr === "TBD") return null;
  try {
    const diff = Math.round((new Date(dateStr) - new Date()) / 86400000);
    return diff;
  } catch { return null; }
}

function CountdownLabel({ dateStr }) {
  const d = daysUntil(dateStr);
  if (d === null) return <span className="countdown">TBD</span>;
  if (d < 0)  return <span className="countdown countdown-done">已发行</span>;
  if (d === 0) return <span className="countdown countdown-today">TODAY !</span>;
  if (d <= 3)  return <span className="countdown countdown-soon">{d}d 后</span>;
  return <span className="countdown">{d}d 后</span>;
}

function fmt(p) {
  if (p == null) return "—";
  if (typeof p === "string") return p;
  return p < 0.01 ? `$${p.toFixed(6)}` : p < 1 ? `$${p.toFixed(4)}` : `$${p.toLocaleString()}`;
}

function fmtMcap(mc) {
  if (!mc) return "—";
  if (mc > 1e9) return `$${(mc / 1e9).toFixed(1)}B`;
  if (mc > 1e6) return `$${(mc / 1e6).toFixed(1)}M`;
  return `$${(mc / 1e3).toFixed(0)}K`;
}

function nowJST() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", timeZone: "Asia/Tokyo",
  }) + " JST";
}

// ── Fetch CoinGecko ───────────────────────────────────────────────────────────
async function fetchCrypto() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets" +
    "?vs_currency=usd&order=id_asc&per_page=50&page=1&sparkline=false"
  );
  if (!res.ok) throw new Error("CoinGecko " + res.status);
  const all = await res.json();

  // Filter for lower-cap / newer coins as proxy for "recently listed"
  return all
    .filter(c => c.market_cap && c.market_cap < 100_000_000)
    .sort((a, b) => (b.ath_date || "").localeCompare(a.ath_date || ""))
    .slice(0, 12)
    .map(c => ({
      type: "crypto",
      id: `crypto_${c.id}`,
      name: c.name,
      symbol: c.symbol.toUpperCase(),
      price: c.current_price,
      market_cap: c.market_cap,
      change24h: c.price_change_percentage_24h,
      image: c.image,
      cgId: c.id,
    }));
}

// ── Fetch AI news (Anthropic API + web search) ────────────────────────────────
async function fetchNews(item) {
  const isIPO = item.type.startsWith("ipo");
  const subject = isIPO
    ? `${item.name} (${item.ticker}) IPO`
    : `${item.name} (${item.symbol}) cryptocurrency`;

  const prompt = isIPO
    ? `Search for the very latest news about the upcoming ${subject}.
Summarize: company background, what it does, IPO details, investor sentiment, analyst opinions, key risks.
Write in clear paragraphs. Be factual and concise.`
    : `Search for the latest news about ${subject} crypto token.
Summarize: what the project does, recent listings/price action, community sentiment, notable developments, risks.
Write in clear paragraphs. Be factual and concise.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      tools: [{ type: "web_search_20250305", name: "web_search" }],
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) throw new Error("API " + res.status);
  const data = await res.json();
  return data.content
    .filter(b => b.type === "text")
    .map(b => b.text)
    .join("\n\n")
    .trim() || "No information found.";
}

// ── Card ──────────────────────────────────────────────────────────────────────
function Card({ item, selected, onClick }) {
  const isIPO = item.type.startsWith("ipo");
  const isPriced = item.type === "ipo_priced";

  return (
    <div className={`card ${selected ? "selected" : ""}`} onClick={() => onClick(item)}>
      <div className="card-ticker">
        {isIPO ? `$${item.ticker}` : item.symbol}
        {item.image && <img className="card-coin-img" src={item.image} alt="" />}
      </div>
      <div className="card-name">{item.name}</div>
      <div className="card-footer">
        <span className={`badge ${isPriced ? "badge-priced" : isIPO ? "badge-ipo" : "badge-crypto"}`}>
          {isPriced ? "Priced" : isIPO ? "IPO" : "New"}
        </span>
        {isIPO && !isPriced && <CountdownLabel dateStr={item.date} />}
        {isPriced && <span className="countdown countdown-done">✓ 已定价</span>}
        {!isIPO && (
          <span className={item.change24h >= 0 ? "change-pos" : "change-neg"}>
            {item.change24h != null
              ? (item.change24h >= 0 ? "+" : "") + item.change24h.toFixed(1) + "%"
              : "—"}
          </span>
        )}
      </div>
      {isIPO && item.exchange && <span className="exchange-tag">{item.exchange}</span>}
    </div>
  );
}

// ── Detail panel ──────────────────────────────────────────────────────────────
function Detail({ item, news, loading, error }) {
  if (!item) {
    return (
      <div className="no-sel">
        <div className="no-sel-icon">◈</div>
        <div>点击左侧列表<br />查看 AI 新闻摘要</div>
      </div>
    );
  }

  const isIPO = item.type.startsWith("ipo");
  const isPriced = item.type === "ipo_priced";

  return (
    <div className="detail">
      <div className="d-ticker">{isIPO ? `$${item.ticker}` : item.symbol}</div>
      <div className="d-name">{item.name}</div>

      <div className="d-stats">
        {isIPO && !isPriced && <>
          <div><div className="stat-label">价格区间</div><div className="stat-value">${item.price_range}</div></div>
          <div><div className="stat-label">交易所</div><div className="stat-value">{item.exchange}</div></div>
          <div><div className="stat-label">预计发行日</div><div className="stat-value">{item.date}</div></div>
          {item.shares && <div><div className="stat-label">发行股数</div><div className="stat-value">{item.shares}</div></div>}
        </>}
        {isPriced && <>
          <div><div className="stat-label">发行价</div><div className="stat-value">${item.price}</div></div>
          <div><div className="stat-label">交易所</div><div className="stat-value">{item.exchange}</div></div>
          <div><div className="stat-label">定价日</div><div className="stat-value">{item.date}</div></div>
        </>}
        {!isIPO && <>
          <div><div className="stat-label">价格</div><div className="stat-value">{fmt(item.price)}</div></div>
          <div><div className="stat-label">市值</div><div className="stat-value">{fmtMcap(item.market_cap)}</div></div>
          <div>
            <div className="stat-label">24h 涨跌</div>
            <div className="stat-value" style={{ color: item.change24h >= 0 ? T.green : T.red }}>
              {item.change24h != null ? (item.change24h >= 0 ? "+" : "") + item.change24h.toFixed(2) + "%" : "—"}
            </div>
          </div>
        </>}
      </div>

      <div className="news-head">AI News Digest</div>
      {loading && (
        <div className="news-loading">
          <div className="spinner" />
          搜索最新资讯中…
        </div>
      )}
      {error && <div className="news-error">⚠ {error}</div>}
      {news && !loading && <div className="news-body">{news}</div>}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab]           = useState("ipo");
  const [cryptos, setCryptos]   = useState([]);
  const [cryptoLoading, setCL]  = useState(true);
  const [selected, setSelected] = useState(null);
  const [news, setNews]         = useState(null);
  const [newsLoading, setNL]    = useState(false);
  const [newsError, setNE]      = useState(null);
  const [cache, setCache]       = useState({});
  const [time, setTime]         = useState(nowJST());

  useEffect(() => {
    const t = setInterval(() => setTime(nowJST()), 30000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    fetchCrypto()
      .then(setCryptos)
      .catch(e => console.warn("CoinGecko:", e))
      .finally(() => setCL(false));
  }, []);

  const select = useCallback(async (item) => {
    setSelected(item);
    if (cache[item.id]) { setNews(cache[item.id]); setNL(false); setNE(null); return; }
    setNews(null); setNE(null); setNL(true);
    try {
      const result = await fetchNews(item);
      setNews(result);
      setCache(p => ({ ...p, [item.id]: result }));
    } catch (e) {
      setNE("加载失败：" + e.message);
    } finally {
      setNL(false);
    }
  }, [cache]);

  const feed = tab === "ipo" ? MOCK_IPOS : cryptos;

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div className="shell">
        <div className="header">
          <div className="header-left">
            <div className="header-title">
              <span className="live-dot" />
              IPO · Crypto Tracker
            </div>
            <span className="header-sub">Nasdaq + CoinGecko · AI News</span>
          </div>
          <div className="header-time">{time}</div>
        </div>

        <div className="body">
          <div className="sidebar">
            <div className="tab-bar">
              <button className={`tab ${tab === "ipo" ? "active" : ""}`} onClick={() => setTab("ipo")}>
                IPO ({MOCK_IPOS.length})
              </button>
              <button className={`tab ${tab === "crypto" ? "active" : ""}`} onClick={() => setTab("crypto")}>
                Crypto {cryptoLoading ? "…" : `(${cryptos.length})`}
              </button>
            </div>
            <div className="feed">
              {tab === "crypto" && cryptoLoading && <div className="feed-empty">从 CoinGecko<br />加载数据中…</div>}
              {feed.length === 0 && !cryptoLoading && <div className="feed-empty">暂无数据</div>}
              {feed.map(item => (
                <Card key={item.id} item={item} selected={selected?.id === item.id} onClick={select} />
              ))}
            </div>
          </div>

          <div className="main">
            <Detail item={selected} news={news} loading={newsLoading} error={newsError} />
          </div>
        </div>
      </div>
    </>
  );
}
