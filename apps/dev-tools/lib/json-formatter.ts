export interface JsonFormatResult {
  success: boolean;
  output?: string;
  error?: string;
}

function extractErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "JSON inválido.";
}

export function formatJson(input: string, indent: number = 2): JsonFormatResult {
  if (!input.trim()) return { success: false, error: "Cole um JSON para formatar." };

  try {
    const parsed = JSON.parse(input);
    return { success: true, output: JSON.stringify(parsed, null, indent) };
  } catch (error) {
    return { success: false, error: extractErrorMessage(error) };
  }
}

export function minifyJson(input: string): JsonFormatResult {
  if (!input.trim()) return { success: false, error: "Cole um JSON para minificar." };

  try {
    const parsed = JSON.parse(input);
    return { success: true, output: JSON.stringify(parsed) };
  } catch (error) {
    return { success: false, error: extractErrorMessage(error) };
  }
}
