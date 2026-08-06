/**
 * A deliberately small JavaScript highlighter for the marketing code samples.
 * It covers the handful of token types the samples use and keeps the page free of a
 * client-side highlighting dependency.
 */

export type TokenKind = "keyword" | "string" | "comment" | "function" | "number" | "plain";

export interface Token {
  kind: TokenKind;
  text: string;
}

const KEYWORDS = new Set([
  "async",
  "await",
  "const",
  "else",
  "export",
  "false",
  "from",
  "function",
  "if",
  "import",
  "let",
  "new",
  "null",
  "return",
  "true",
]);

const TOKEN_PATTERN =
  /(\/\/.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)(?=\s*\()|([A-Za-z_$][\w$]*)/gm;

export function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let cursor = 0;

  for (const match of line.matchAll(TOKEN_PATTERN)) {
    const index = match.index ?? 0;
    if (index > cursor) tokens.push({ kind: "plain", text: line.slice(cursor, index) });

    const [text, comment, str, num, call, word] = match;
    if (comment) tokens.push({ kind: "comment", text });
    else if (str) tokens.push({ kind: "string", text });
    else if (num) tokens.push({ kind: "number", text });
    else if (call) tokens.push({ kind: KEYWORDS.has(call) ? "keyword" : "function", text });
    else if (word) tokens.push({ kind: KEYWORDS.has(word) ? "keyword" : "plain", text });

    cursor = index + text.length;
  }

  if (cursor < line.length) tokens.push({ kind: "plain", text: line.slice(cursor) });
  return tokens;
}

export function tokenize(code: string): Token[][] {
  return code.split("\n").map(tokenizeLine);
}
