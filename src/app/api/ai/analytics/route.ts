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
    const { sessionsCount, completedTasksCount, totalFocusMinutes, ikigaiPurpose, recentTasks } = body;

    const fallbackAnalytics = {
      headline: "Konsistensi Tenang Adalah Kunci Kaizen",
      summary: `Kamu telah menyelesaikan ${sessionsCount || 0} sesi fokus (${totalFocusMinutes || 0} menit) dan ${completedTasksCount || 0} tugas mikro dengan baik.`,
      strengths: [
        "Memulai sesi dengan persiapan ritual Osoji yang disiplin",
        "Memecah tugas besar menjadi langkah mikro yang realistis",
        "Menjaga ritme fokus tanpa terburu-buru",
      ],
      recommendations: [
        "Pertahankan 2-3 sesi fokus berkualitas tinggi setiap hari daripada memaksakan kelelahan",
        "Gunakan jeda singkat 5 menit di antara sesi untuk menyegarkan pikiran",
      ],
      efficiencyScore: Math.min(98, 75 + (sessionsCount || 0) * 5 + (completedTasksCount || 0) * 2),
    };

    const ai = getGenAI();

    if (!ai) {
      return NextResponse.json({ success: true, analytics: fallbackAnalytics });
    }

    const prompt = `You are a Japanese Kaizen & Ikigai Productivity Analyst.
Analyze the user's completed focus data:
- Total Focus Sessions Completed: ${sessionsCount || 0}
- Total Focus Duration: ${totalFocusMinutes || 0} minutes
- Completed Tasks/Micro-steps: ${completedTasksCount || 0}
- User's Core Ikigai Purpose: "${ikigaiPurpose || 'Membangun karya bermakna'}"
- Recent Completed Tasks: ${JSON.stringify(recentTasks || [])}

Provide a structured, deeply inspiring JSON analysis in Indonesian with:
1. "headline": A short 1-sentence Japanese wisdom summary.
2. "summary": A 2-sentence analytical summary of their productivity pattern.
3. "strengths": Array of 3 specific positive productivity habits observed.
4. "recommendations": Array of 2 actionable Kaizen advice points to prevent burnout and boost momentum.
5. "efficiencyScore": Number between 75 and 98 based on consistency.

Output raw JSON only with no markdown backticks.`;

    const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash-exp"];
    let responseText = "";

    for (const modelName of modelsToTry) {
      try {
        const model = ai.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        if (text) {
          responseText = text;
          break;
        }
      } catch (e) {
        console.warn(`Analytics model ${modelName} failed:`, e);
      }
    }

    if (!responseText) {
      return NextResponse.json({ success: true, analytics: fallbackAnalytics });
    }

    const cleaned = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json({ success: true, analytics: parsed });
  } catch (error) {
    console.error("API /api/ai/analytics Error:", error);
    return NextResponse.json({ error: "Gagal membuat analisa AI." }, { status: 500 });
  }
}
