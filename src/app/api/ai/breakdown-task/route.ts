import { NextResponse } from "next/server";
import { breakdownTaskWithGemini } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { taskTitle } = body;

    if (!taskTitle || typeof taskTitle !== "string") {
      return NextResponse.json(
        { error: "Judul tugas (taskTitle) wajib diisi." },
        { status: 400 }
      );
    }

    const microTasks = await breakdownTaskWithGemini(taskTitle.trim());

    return NextResponse.json({ microTasks, success: true });
  } catch (error) {
    console.error("API /api/ai/breakdown-task Error:", error);
    return NextResponse.json(
      { error: "Gagal memproses breakdown tugas AI.", microTasks: [] },
      { status: 500 }
    );
  }
}
