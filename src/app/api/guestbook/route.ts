import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Guest } from "@/lib/models";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const list = await Guest.find().sort({ createdAt: -1 }).limit(30).lean();
    return NextResponse.json({
      items: list.map((g) => ({ id: String(g._id), name: g.name, message: g.message, createdAt: g.createdAt })),
    });
  } catch {
    return NextResponse.json({ items: [], error: "db" }, { status: 503 });
  }
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { name?: unknown; message?: unknown } | null;
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (!name || name.length > 20) return NextResponse.json({ error: "이름은 1~20자로 입력해 주세요." }, { status: 400 });
  if (!message || message.length > 300) return NextResponse.json({ error: "내용은 1~300자로 입력해 주세요." }, { status: 400 });
  try {
    await connectDB();
    await Guest.create({ name, message });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "저장하지 못했습니다. 잠시 후 다시 시도해 주세요." }, { status: 503 });
  }
}
