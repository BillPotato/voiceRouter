import { POST } from "../src/app/api/classify/route";
import utterances from "./data/utterances.json";

type UtteranceCase = {
  input: string;
  expected: "Sales" | "Technical Support" | "Billing & Payments" | "General Inquiry";
};

describe("POST /api/classify", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    process.env.OPENROUTER_API_KEY = "test-openrouter-key";
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
    delete process.env.OPENROUTER_API_KEY;
  });

  test.each(utterances as UtteranceCase[])(
    "routes '$input' to '$expected'",
    async ({ input, expected }) => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [
            {
              message: {
                content: JSON.stringify({
                  department: expected,
                  confidence: "91%",
                }),
              },
            },
          ],
        }),
      });

      const request = new Request("http://localhost/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const response = await POST(request);
      const payload = (await response.json()) as { department: string };

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(payload.department).toBe(expected);
    },
  );
});
