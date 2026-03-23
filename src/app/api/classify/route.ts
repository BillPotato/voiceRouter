import { NextResponse } from "next/server";

interface ClassifyRequestBody {
  text?: string;
  content?: string;
}

interface OpenRouterResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

interface RoutingDecision {
  department: "Sales" | "Technical Support" | "Billing & Payments" | "General Inquiry";
  confidence: string;
}

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "google/gemini-flash-1.5";
const REQUEST_TIMEOUT_MS = 12000;

function heuristicDecision(text: string): RoutingDecision {
  const normalized = text.toLowerCase();

  if (/(price|plan|quote|demo|trial|enterprise|sales)/.test(normalized)) {
    return { department: "Sales", confidence: "64%" };
  }

  if (/(bug|error|issue|crash|login|support|technical|integration)/.test(normalized)) {
    return { department: "Technical Support", confidence: "66%" };
  }

  if (/(invoice|refund|billing|subscription|payment|card|charge)/.test(normalized)) {
    return { department: "Billing & Payments", confidence: "67%" };
  }

  return { department: "General Inquiry", confidence: "45%" };
}

function normalizeDepartment(value: string | undefined): RoutingDecision["department"] {
  const normalized = (value ?? "").trim().toLowerCase();

  if (normalized === "sales") {
    return "Sales";
  }

  if (
    normalized === "technical support" ||
    normalized === "support" ||
    normalized === "tech support"
  ) {
    return "Technical Support";
  }

  if (normalized === "billing & payments" || normalized === "billing" || normalized === "payments") {
    return "Billing & Payments";
  }

  return "General Inquiry";
}

function normalizeConfidence(value: string | undefined): string {
  if (!value) {
    return "50%";
  }

  const match = value.trim().match(/^(\d{1,3})%$/);
  if (!match) {
    return "50%";
  }

  const amount = Number.parseInt(match[1], 10);
  const clamped = Math.max(0, Math.min(100, amount));
  return `${clamped}%`;
}

function tryParseJsonObject(input: string | undefined): Record<string, unknown> | null {
  if (!input) {
    return null;
  }

  try {
    return JSON.parse(input) as Record<string, unknown>;
  } catch {
    const start = input.indexOf("{");
    const end = input.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      return null;
    }

    try {
      return JSON.parse(input.slice(start, end + 1)) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Server is missing OPENROUTER_API_KEY configuration." },
      { status: 500 },
    );
  }

  let body: ClassifyRequestBody;

  try {
    body = (await request.json()) as ClassifyRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const text = (body.text ?? body.content ?? "").trim();

  if (!text) {
    return NextResponse.json({ error: "Text is required for classification." }, { status: 400 });
  }

  const systemPrompt = [
    "You are a routing assistant.",
    "You must output ONLY a raw JSON object with exactly these keys:",
    '{"department":"Sales|Technical Support|Billing & Payments|General Inquiry","confidence":"NN%"}',
    "Rules:",
    "- department must be one of: Sales, Technical Support, Billing & Payments, General Inquiry.",
    "- confidence must be a percentage string like 82%.",
    "- Do not include markdown, code fences, or extra commentary.",
    "- Output only JSON.",
  ].join("\n");

  const abortController = new AbortController();
  const timeout = setTimeout(() => {
    abortController.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text },
        ],
        response_format: {
          type: "json_object",
        },
          temperature: 0,
      }),
      signal: abortController.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const fallback = heuristicDecision(text);
      return NextResponse.json(fallback);
    }

    const payload = (await response.json()) as OpenRouterResponse;
    const content = payload.choices?.[0]?.message?.content;
    const parsed = tryParseJsonObject(content);

    if (!parsed) {
      const fallback = heuristicDecision(text);
      return NextResponse.json(fallback);
    }

    const decision: RoutingDecision = {
      department: normalizeDepartment(
        typeof parsed.department === "string" ? parsed.department : undefined,
      ),
      confidence: normalizeConfidence(
        typeof parsed.confidence === "string" ? parsed.confidence : undefined,
      ),
    };

    return NextResponse.json(decision);
  } catch (error) {
    clearTimeout(timeout);

    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Classification request timed out. Please try again." },
        { status: 504 },
      );
    }

    const fallback = heuristicDecision(text);
    return NextResponse.json(fallback);
  }
}
