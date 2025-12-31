// Gemini API service
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

export const callGemini = async (prompt, systemInstruction = "") => {
    if (!GEMINI_API_KEY) {
        throw new Error("Gemini API key not configured. Set VITE_GEMINI_API_KEY in your environment.");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined
    };

    const maxRetries = 5;

    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result.candidates?.[0]?.content?.parts?.[0]?.text;
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(res => setTimeout(res, Math.pow(2, i) * 1000));
        }
    }
};

export const buildPrompt = (type, route, allRoutes, t) => {
    const system = t.systemInstruction;
    let prompt = "";

    switch (type) {
        case 'recommend':
            prompt = `Basándote en estas rutas: ${JSON.stringify(allRoutes.map(r => r.title))}, ${t.recomiendaPrompt}`;
            break;
        case 'briefing':
            if (route) {
                prompt = `Ruta: "${route.title}". Descripción: ${route.desc}. ${t.briefingPrompt}`;
            }
            break;
        case 'checklist':
            if (route) {
                prompt = `Ruta "${route.title}" (${route.dist} km, ${route.time}). ${t.checklistPrompt}`;
            }
            break;
        case 'safety':
            if (route) {
                prompt = t.safetyPrompt.replace("[TITLE]", route.title);
            }
            break;
        case 'stops':
            if (route) {
                prompt = t.stopsPrompt.replace("[TITLE]", route.title);
            }
            break;
        case 'magic':
            if (route) {
                prompt = t.magicPrompt
                    .replace("[TITLE]", route.title)
                    .replace("[URL]", route.link);
            }
            break;
        default:
            break;
    }

    return { prompt, system };
};
