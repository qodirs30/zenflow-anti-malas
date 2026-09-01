import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Helper to obtain the Gemini API instance.
 * Uses process.env.GEMINI_API_KEY securely on the server side.
 */
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
}

/**
 * Kaizen Task Splitter (Gemini 3.6 Flash / gemini-2.5-flash)
 * Breaks down a large task into 3-5 micro-tasks (<5 min each).
 */
export async function breakdownTaskWithGemini(taskTitle: string): Promise<Array<{ title: string; durationMinutes: number }>> {
  const ai = getGenAI();

  if (!ai) {
    console.warn("GEMINI_API_KEY is not set. Using smart Kaizen fallback breakdown.");
    return generateFallbackBreakdown(taskTitle);
  }

  const prompt = `You are a Japanese Kaizen productivity master.
Your goal is to eliminate resistance and procrastination by breaking down a large or daunting task into 3 to 5 micro-tasks.
Each micro-task MUST be extremely small and take between 2 to 5 minutes to complete.

Task: "${taskTitle}"

Output MUST be a raw JSON array of objects with no markdown formatting or wrappers.
Each object must have two fields:
- "title": a clear, immediate micro-action (string in Indonesian or English matching user prompt language)
- "durationMinutes": number between 2 and 5

Example format:
[
  {"title": "Buka dokumen dan tulis judul utama (2 min)", "durationMinutes": 2},
  {"title": "Tulis 3 poin outline paragraf pertama (3 min)", "durationMinutes": 3},
  {"title": "Kumpulkan 2 referensi gambar/link (4 min)", "durationMinutes": 4}
]`;

  try {
    // Model fallback strategy: gemini-2.5-flash -> gemini-1.5-flash
    let modelName = "gemini-2.5-flash";
    let model = ai.getGenerativeModel({ model: modelName });
    
    let responseText = "";
    try {
      const result = await model.generateContent(prompt);
      responseText = result.response.text();
    } catch {
      // Fallback to gemini-1.5-flash if model identifier differs
      model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      responseText = result.response.text();
    }

    // Clean JSON response
    const cleanedText = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanedText);

    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.slice(0, 5).map((item) => ({
        title: String(item.title || "Langkah kecil pertama"),
        durationMinutes: Math.min(5, Math.max(2, Number(item.durationMinutes) || 3)),
      }));
    }
    return generateFallbackBreakdown(taskTitle);
  } catch (error) {
    console.error("Gemini Task Breakdown Error:", error);
    return generateFallbackBreakdown(taskTitle);
  }
}

/**
 * Post-Session Reflection (Gemini 3.7 Flash / gemini-2.5-pro / flash)
 * Analyzes session reflection + user Ikigai purpose, providing 1-sentence encouraging feedback.
 */
export async function reflectWithGemini(
  userReflection: string,
  ikigaiPurpose: string,
  taskTitle: string
): Promise<string> {
  const ai = getGenAI();

  if (!ai) {
    return generateFallbackReflection(ikigaiPurpose);
  }

  const prompt = `You are a mindful Japanese Zen mentor emphasizing Ichigo Ichie (treasuring this single moment) and Ikigai (life purpose).
User completed a 25-minute focus session on: "${taskTitle}".
User's Ikigai Purpose: "${ikigaiPurpose || 'Membangun karya bermakna dengan konsistensi tenang'}"
User's 1-sentence reflection: "${userReflection}"

Provide a warm, highly encouraging, wise 1-sentence feedback (in Indonesian) connecting their small focus victory today to their larger Ikigai purpose. Keep it under 25 words. Do not use quotes.`;

  try {
    let model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    try {
      const result = await model.generateContent(prompt);
      return result.response.text().trim();
    } catch {
      model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      return result.response.text().trim();
    }
  } catch (error) {
    console.error("Gemini Reflection Error:", error);
    return generateFallbackReflection(ikigaiPurpose);
  }
}

// Fallbacks for local offline or unset API key testing
function generateFallbackBreakdown(taskTitle: string) {
  return [
    { title: `Buka workspace & siapkan catatan untuk "${taskTitle}"`, durationMinutes: 2 },
    { title: `Tuliskan 3 konsep kunci pertama tanpa ragu`, durationMinutes: 3 },
    { title: `Selesaikan draf langkah 1 secara fokus`, durationMinutes: 5 },
    { title: `Review singkat hasil langkah awal`, durationMinutes: 3 },
  ];
}

function generateFallbackReflection(ikigaiPurpose: string) {
  if (ikigaiPurpose) {
    return `Langkah kecil hari ini adalah batu pijakan nyata menuju tujuan besarmu: ${ikigaiPurpose}. Pertahankan ketenangan ini.`;
  }
  return `Satu momen fokus hari ini telah mendekatkanmu pada karya terbaikmu dengan semangat Kaizen.`;
}
