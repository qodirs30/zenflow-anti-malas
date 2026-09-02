import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenerativeAI(apiKey);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history, ikigaiPurpose } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Pesan tidak boleh kosong." }, { status: 400 });
    }

    const ai = getGenAI();

    if (!ai) {
      return NextResponse.json({
        reply: "Salam hangat. Rasa malas seringkali bukanlah karena kurangnya kemampuan, melainkan bentuk perlindungan diri dari rasa takut atau kebingungan. Cobalah pecah tugasmu menjadi langkah 2 menit dengan Kaizen.",
        success: true,
      });
    }

    const systemPrompt = `You are "Sensei Zen", a wise, compassionate Japanese productivity mentor who guides users using 4 core Japanese philosophies:
1. Ikigai (生き甲斐) - Core life purpose & intrinsic motivation.
2. Kaizen (改善) - 1% continuous micro-steps to remove friction.
3. Osoji (掃除) - Workspace prep & mental clarity.
4. Ichigo Ichie (一期一会) - Treasuring this exact focus moment.

User's Ikigai Goal: "${ikigaiPurpose || 'Membangun karya bermakna'}"

Instructions:
- Provide warm, practical, wise, and deeply encouraging advice in Indonesian.
- Keep responses concise (under 80 words), actionable, and empathetic.
- Recommend small micro-steps when the user feels stuck, lazy, or overwhelmed.
- Do not use markdown wrappers.`;

    const chatHistory = Array.isArray(history)
      ? history.map((msg: { role: string; content: string }) => `${msg.role === 'user' ? 'User' : 'Sensei'}: ${msg.content}`).join("\n")
      : "";

    const prompt = `${systemPrompt}\n\nChat History:\n${chatHistory}\n\nUser: ${message}\nSensei:`;

    try {
      let model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
      let reply = "";
      try {
        const result = await model.generateContent(prompt);
        reply = result.response.text().trim();
      } catch {
        model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        reply = result.response.text().trim();
      }

      return NextResponse.json({ reply, success: true });
    } catch (err) {
      console.error("Gemini Sensei Chat Error:", err);
      return NextResponse.json({
        reply: "Kunci dari mengatasi penundaan adalah tidak menunggu motivasi datang, melainkan mengambil satu aksi mikro terkecil hari ini.",
        success: true,
      });
    }
  } catch (error) {
    console.error("API /api/ai/chat Error:", error);
    return NextResponse.json({ error: "Gagal memproses konsultasi Sensei AI." }, { status: 500 });
  }
}
