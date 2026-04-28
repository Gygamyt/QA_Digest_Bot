import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    GOOGLE_API_KEY: z.string().min(1, "Нужен ключ от Google (Gemini)"),
    TAVILY_API_KEY: z.string().min(1, "Нужен ключ от Tavily"),
    GOOGLE_CHAT_WEBHOOK_URL: z.string().url("Должен быть валидным URL адресом вебхука"),

    DEBUG_MODE: z.string()
        .optional()
        .default("false")
        .transform((val) => val === 'true'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error("❌ КРИТИЧЕСКАЯ ОШИБКА: Неправильная конфигурация окружения!");

    const errors = parsedEnv.error.format();
    if (errors.GOOGLE_API_KEY) console.error("- GOOGLE_API_KEY:", errors.GOOGLE_API_KEY._errors.join(', '));
    if (errors.TAVILY_API_KEY) console.error("- TAVILY_API_KEY:", errors.TAVILY_API_KEY._errors.join(', '));
    if (errors.GOOGLE_CHAT_WEBHOOK_URL) console.error("- GOOGLE_CHAT_WEBHOOK_URL:", errors.GOOGLE_CHAT_WEBHOOK_URL._errors.join(', '));

    process.exit(1);
}

export const ENV = parsedEnv.data;
