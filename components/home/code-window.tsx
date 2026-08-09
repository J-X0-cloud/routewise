import { Fragment } from "react";

import { tokenize } from "@/lib/highlight";

const TOKEN_CLASS = {
  keyword: "tok-keyword",
  string: "tok-string",
  comment: "tok-comment",
  function: "tok-function",
  number: "tok-number",
  plain: undefined,
} as const;

interface CodeWindowProps {
  filename: string;
  language: string;
  code: string;
}

export function CodeWindow({ filename, language, code }: CodeWindowProps) {
  const lines = tokenize(code);

  return (
    <div className="rw-code w-full self-center">
      <div className="rw-code-head">
        <span>{filename}</span>
        <span>{language}</span>
      </div>
      <pre>
        <code>
          {lines.map((tokens, lineIndex) => (
            <Fragment key={lineIndex}>
              <span className="ln">{lineIndex + 1}</span>
              {tokens.map((token, tokenIndex) => (
                <span key={tokenIndex} className={TOKEN_CLASS[token.kind]}>
                  {token.text}
                </span>
              ))}
              {lineIndex < lines.length - 1 ? "\n" : null}
            </Fragment>
          ))}
        </code>
      </pre>
    </div>
  );
}
