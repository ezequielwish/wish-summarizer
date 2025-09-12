import { GoogleGenAI } from "@google/genai";

const MAX_CHARS_PER_CHUNK = 2000;

// Função para dividir texto em chunks
function chunkText(text, maxChars) {
    const chunks = [];
    let start = 0;
    while (start < text.length) {
        chunks.push(text.substring(start, start + maxChars));
        start += maxChars;
    }
    return chunks;
}

export async function POST(req) {
    try {
        const { wishes } = await req.json();
        const fullText = wishes;
        const chunks = chunkText(fullText, MAX_CHARS_PER_CHUNK);
        const client = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

        const partialSummaries = [];

        for (const chunk of chunks) {
            const prompt = `
Resuma o seguinte texto.
Seja conciso e claro.
Não adicione comentários.
Mantenha o texto o mais fiel possivel ao original, sem inventar parágrafos.
A idéia é apenas resumir o texto, e não falar sobre o assunto.
O texto precisa ser sempre menor que o original, mas sem perder o sentido.

Texto: ${chunk}
`;
            const response = await client.models.generateContent({
                model: "gemini-2.0-flash",
                contents: [prompt],
            });
            partialSummaries.push(response?.text?.trim() || "");
        }

        let finalSummary = partialSummaries.join(" ");

        // Se houver múltiplos chunks, gera resumo final coerente
        if (partialSummaries.length > 1) {
            const finalPrompt = `
Com base nos seguintes resumos parciais, gere um resumo final conciso e coerente.
Mantenha o maximo de fidelidade ao texto original, sem inventar parágrafos ou adicionar comentários.

${finalSummary}
`;
            const finalResponse = await client.models.generateContent({
                model: "gemini-2.0-flash",
                contents: [finalPrompt],
            });
            finalSummary = finalResponse?.text?.trim() || finalSummary;
        }

        return new Response(
            JSON.stringify({
                summary: finalSummary,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Erro ao gerar resumo:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}