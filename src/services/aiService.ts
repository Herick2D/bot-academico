import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const getImprovedText = async (text: string): Promise<string> => {
    const prompt = `Revise o seguinte texto de um trabalho acadêmico, identificando erros gramaticais, estruturais e sugerindo melhorias. 
    O texto melhorado deve manter o formato original e apresentar uma escrita clara e objetiva.

    Texto original:
    "${text}"

    Texto melhorado:`;

    const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    });

    return response.choices[0]?.message?.content || "Erro ao gerar melhorias.";
};
