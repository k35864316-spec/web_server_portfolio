"use client";

import { useCallback, useEffect, useState } from "react";

type Item = { id: string; name: string; message: string; createdAt: string };

export default function Guestbook() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/guestbook", { cache: "no-store" });
    const data = await res.json().catch(() => ({ items: [] }));
    setItems(data.items ?? []);
    if (!res.ok) setError("방명록을 불러올 수 없습니다. (DB 연결을 확인해 주세요)");
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });
    setBusy(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "저장하지 못했습니다.");
      return;
    }
    setMessage("");
    load();
  }

  return (
    <div>
      <form onSubmit={submit} className="gb-form">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" maxLength={20} required />
        <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="한마디를 남겨 주세요" maxLength={300} required />
        <button type="submit" disabled={busy}>{busy ? "등록 중…" : "등록"}</button>
      </form>
      {error && <p className="gb-error">{error}</p>}
      <ul className="gb-list">
        {items.length === 0 && !error && <li className="muted">아직 남겨진 글이 없습니다. 첫 글을 남겨 주세요.</li>}
        {items.map((g) => (
          <li key={g.id}>
            <strong>{g.name}</strong>
            <span className="muted"> · {new Date(g.createdAt).toLocaleDateString("ko-KR")}</span>
            <p>{g.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
