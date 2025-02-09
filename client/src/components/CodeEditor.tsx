import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import { languages } from "@/lib/languages";

interface CodeEditorProps {
  language: string;
  value: string;
  code: string;
  readOnly: boolean;
  onChange: (value: string) => void;
}

export default function CodeEditor({ language, value, onChange }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      monaco.languages.register({ id: language });
      
      const langConfig = languages.find(l => l.id === language);
      if (langConfig?.tokenizer) {
        monaco.languages.setMonarchTokensProvider(language, langConfig.tokenizer);
      }

      monacoRef.current = monaco.editor.create(editorRef.current, {
        value,
        language,
        theme: "vs-dark",
        minimap: { enabled: false },
        fontSize: 14,
        fontFamily: "'Fira Code', 'Source Code Pro', monospace",
        automaticLayout: true,
        scrollBeyondLastLine: false,
        lineNumbers: "on",
        roundedSelection: true,
        padding: { top: 16 }
      });

      monacoRef.current.onDidChangeModelContent(() => {
        onChange(monacoRef.current?.getValue() || "");
      });

      return () => monacoRef.current?.dispose();
    }
  }, [language]);

  useEffect(() => {
    if (monacoRef.current && value !== monacoRef.current.getValue()) {
      monacoRef.current.setValue(value);
    }
  }, [value]);

  return <div ref={editorRef} className="h-[600px] w-full" />;
}
