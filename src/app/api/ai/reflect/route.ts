import { NextResponse } from "next/server";
import { reflectWithGemini } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { reflection, ikigai, taskTitle } = body;

    const feedback = await reflectWithGemini(
      reflection || "Saya berhasil tetap fokus sepanjang 25 menit.",
      ikigai || "",
      taskTitle || "Tugas Fokus"
    );

    return NextResponse.json({ feedback, success: true });
  } catch (error) {
    console.error("API /api/ai/reflect Error:", error);
    return NextResponse.json(
      {
        feedback: "Setiap menit fokus hari ini mendekatkanmu pada karya bermaknamu.",
        success: false,
      },
      { status: 500 }
    );
  }
}
