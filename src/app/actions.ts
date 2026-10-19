"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Guest } from "@/lib/models";

/** 방명록 글을 저장한다. 길이를 서버에서 다시 확인한다. (스키마에도 같은 제한이 있다) */
export async function addGuest(formData: FormData): Promise<void> {
  const name = String(formData.get("name") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  if (!name || name.length > 20 || !message || message.length > 300) return;
  try {
    await connectDB();
    await Guest.create({ name, message });
  } catch {
    return;
  }
  revalidatePath("/");
}
