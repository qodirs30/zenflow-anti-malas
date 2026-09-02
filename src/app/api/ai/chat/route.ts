import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenerativeAI(apiKey);
}

// Intelligent contextual fallback when API key is missing or quota exceeded
function generateContextualSenseiReply(message: string, ikigaiPurpose?: string): string {
  const text = message.toLowerCase();

  if (text.includes("sosmed") || text.includes("dopamin") || text.includes("hp") || text.includes("media sosial") || text.includes("scrolling")) {
    return "Pikiranmu sedang mengalami kelelahan dopamin akibat paparan stimulasi instan berlebih. Ini wajar. Jangan menyalahkan dirimu sendiri. Tarik napas dalam-dalam, letakkan HP-mu sejauh 2 meter, dan mari kita mulai 1 langkah mikro 2 menit tanpa distraksi.";
  }

  if (text.includes("cepet") || text.includes("cepat") || text.includes("ai") || text.includes("bot")) {
    return "Sebagai Sensei Zen, keberadaanku di sini adalah untuk merespons kebingunganmu tanpa rasa ragu. Pikiran yang jernih selalu merespons dengan ketenangan murni. Ceritakan lagi apa yang membuatmu mengganjal saat ini.";
  }

  if (text.includes("males") || text.includes("malas") || text.includes("bingung") || text.includes("berantakan") || text.includes("pusing")) {
    return `Merasa berantakan saat ada banyak peluang adalah hal yang alami. Prinsip Kaizen (改善) mengajarkan untuk tidak memikirkan seluruh beban sekaligus. Pilih 1 hal terkecil untuk tujuanmu ("${ikigaiPurpose || 'Karya Bermakna'}") dan selesaikan dalam 5 menit.`;
  }

  if (text.includes("takut") || text.includes("gagal") || text.includes("cemas") || text.includes("ragu")) {
    return "Rasa takut gagal adalah bukti bahwa kamu peduli pada hasil. Namun dalam filosofi Ichigo Ichie, fokus kita bukanlah hasil akhir di masa depan, melainkan kehormatan mengambil tindakan murni di menit ini.";
  }

  if (text.includes("halo") || text.includes("hai") || text.includes("pagi") || text.includes("malam") || text.includes("siang")) {
    return "Salam hangat. Semoga harimu penuh ketenangan. Tugas atau kendala apa yang ingin kita urai bersama hari ini?";
  }

  return `Kunci dari mengatasi penundaan bukan menunggu motivasi sempurna datang, melainkan mengambil aksi mikro terkecil untuk "${ikigaiPurpose || 'tujuan utamamu'}". Apa 1 langkah 2 menit yang bisa kamu lakukan sekarang?`;
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
      const reply = generateContextualSenseiReply(message, ikigaiPurpose);
      return NextResponse.json({ reply, success: true });
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
- Directly address the user's specific statement or question with emotional intelligence.
- Recommend small micro-steps when the user feels stuck, lazy, or overwhelmed.
- Do not use markdown backticks wrappers.`;

    const chatHistory = Array.isArray(history)
      ? history.slice(-6).map((msg: { role: string; content: string }) => `${msg.role === 'user' ? 'User' : 'Sensei'}: ${msg.content}`).join("\n")
      : "";

    const prompt = `${systemPrompt}\n\nChat History:\n${chatHistory}\n\nUser: ${message}\nSensei:`;

    let reply = "";
    const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash-exp"];

    for (const modelName of modelsToTry) {
      try {
        const model = ai.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const text = result.response.text().trim();
        if (text) {
          reply = text;
          break;
        }
      } catch (e) {
        console.warn(`Model ${modelName} attempt failed:`, e);
      }
    }

    if (!reply) {
      reply = generateContextualSenseiReply(message, ikigaiPurpose);
    }

    return NextResponse.json({ reply, success: true });
  } catch (error) {
    console.error("API /api/ai/chat Error:", error);
    return NextResponse.json({
      reply: "Rasa malas hilang begitu kamu menyentuh langkah terkecil pertama.",
      success: true,
    });
  }
}
