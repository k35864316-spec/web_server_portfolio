import { addGuest } from "@/app/actions";
import { connectDB } from "@/lib/db";
import { Guest } from "@/lib/models";
import { C, S } from "@/lib/theme";

type Entry = { id: string; name: string; message: string; createdAt: Date };

async function loadEntries(): Promise<Entry[] | null> {
  try {
    await connectDB();
    const list = await Guest.find().sort({ createdAt: -1 }).limit(20).lean();
    return list.map((g) => ({ id: String(g._id), name: g.name, message: g.message, createdAt: g.createdAt }));
  } catch {
    return null;
  }
}

const input = {
  padding: "10px 12px",
  borderRadius: 10,
  border: `1px solid ${C.line}`,
  background: C.panel,
  color: C.ink,
  font: "inherit",
  minWidth: 0,
} as const;

/** 방명록: 작성은 Server Action, 목록은 서버에서 MongoDB 를 읽어 그린다. 글은 React 가 텍스트로만 출력한다. */
export default async function Guestbook() {
  const entries = await loadEntries();
  return (
    <div style={{ marginTop: 44 }}>
      <h3 style={{ margin: "0 0 14px", fontSize: 20 }}>Guestbook</h3>
      <form action={addGuest} style={{ display: "grid", gridTemplateColumns: "minmax(0, 140px) minmax(0, 1fr) auto", gap: 8 }}>
        <input name="name" placeholder="이름" maxLength={20} required style={input} />
        <input name="message" placeholder="한마디를 남겨 주세요" maxLength={300} required style={input} />
        <button type="submit" style={{ ...S.btnPrimary, cursor: "pointer", font: "inherit", fontWeight: 700 }}>등록</button>
      </form>
      {entries === null ? (
        <p style={{ ...S.sub, color: C.warn }}>방명록을 불러올 수 없어요. MongoDB 연결(MONGODB_URI)을 확인해 주세요.</p>
      ) : entries.length === 0 ? (
        <p style={S.sub}>아직 남겨진 글이 없어요. 첫 글을 남겨 주세요.</p>
      ) : (
        <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0, display: "grid", gap: 10 }}>
          {entries.map((g) => (
            <li key={g.id} style={{ ...S.panel, padding: "12px 16px", overflowWrap: "anywhere" }}>
              <strong>{g.name}</strong>
              <span style={{ color: C.muted }}> · {g.createdAt.toLocaleDateString("ko-KR")}</span>
              <p style={{ margin: "4px 0 0" }}>{g.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
