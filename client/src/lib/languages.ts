export const languages = [
  // Existing esoteric languages
  {
    id: "brainfuck",
    name: "Brainfuck",
    example: `++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.`,
    category: "esoteric",
    tokenizer: {
      tokenizer: {
        root: [
          [/[\+\-\[\]<>\.,]/, "keyword"],
          [/[^+\-\[\]<>.,\s]+/, "comment"],
        ],
      },
    },
  },
  {
    id: "ook",
    name: "Ook!",
    example: `Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook.
Ook. Ook. Ook. Ook. Ook! Ook? Ook! Ook! Ook. Ook?`,
    category: "esoteric",
    tokenizer: {
      tokenizer: {
        root: [
          [/Ook[\.\?\!]/, "keyword"],
          [/[^Ook\s]+/, "comment"],
        ],
      },
    },
  },
  {
    id: "lolcode",
    name: "LOLCODE",
    example: `HAI 1.2
CAN HAS STDIO?
VISIBLE "HAI WORLD!"
KTHXBYE`,
    category: "esoteric",
    tokenizer: {
      tokenizer: {
        root: [
          [/HAI|KTHXBYE|CAN HAS|VISIBLE|I HAS A|ITZ|GIMMEH|BOTH SAEM/, "keyword"],
          [/"[^"]*"/, "string"],
          [/[A-Za-z][A-Za-z0-9_]*/, "variable"],
        ],
      },
    },
  },
  {
    id: "whitespace",
    name: "Whitespace",
    category: "esoteric",
    example: `   \t  \t   
\t
   \t\t  \t \t
\t
   \t\t \t\t  
\t`,
    tokenizer: {
      tokenizer: {
        root: [
          [/[ \t\n]+/, "keyword"],
          [/[^ \t\n]+/, "comment"],
        ],
      },
    },
  },
  {
    id: "befunge",
    name: "Befunge",
    category: "esoteric",
    example: `"dlroW ,olleH">:v
               ^,_@`,
    tokenizer: {
      tokenizer: {
        root: [
          [/[<>v^]/, "keyword"],
          [/[0-9]/, "number"],
          [/[",.!@]/, "string"],
          [/[+\-*\/%]/, "operator"],
        ],
      },
    },
  },
  {
    id: "emojicode",
    name: "Emojicode",
    category: "esoteric",
    example: `🏁 🍇
  😀 🔤Hello, World!🔤
🍉`,
    tokenizer: {
      tokenizer: {
        root: [
          [/[😀🏁🍇🍉🔤]/, "keyword"],
          [/[^😀🏁🍇🍉🔤\s]+/, "string"],
        ],
      },
    },
  },
  {
    id: "false",
    name: "FALSE",
    category: "esoteric",
    example: `"Hello, World!"$`,
    tokenizer: {
      tokenizer: {
        root: [
          [/[\$\[\]\{\}\+\-\*\/\=\>\<\&\|\!\~\@\#]/, "keyword"],
          [/"[^"]*"/, "string"],
          [/[0-9]+/, "number"],
        ],
      },
    },
  },
  // Traditional languages
  {
    id: "binary",
    name: "Binary (Machine Code)",
    category: "traditional",
    example: `01001000 01100101 01101100 01101100 01101111`,
    tokenizer: {
      tokenizer: {
        root: [
          [/[01]+/, "number"],
          [/[^01\s]+/, "comment"],
        ],
      },
    },
  },
  {
    id: "assembly",
    name: "Assembly",
    category: "traditional",
    example: `section .data
    msg db 'Hello, World!',0xa
    len equ $ - msg
section .text
    global _start
_start:
    mov edx,len
    mov ecx,msg
    mov ebx,1
    mov eax,4
    int 0x80`,
    tokenizer: {
      tokenizer: {
        root: [
          [/\b(mov|int|push|pop|call|ret|section|global|db|equ)\b/, "keyword"],
          [/\b[a-z0-9]+\b/, "variable"],
          [/'[^']*'/, "string"],
          [/;.*$/, "comment"],
        ],
      },
    },
  },
  {
    id: "apl",
    name: "APL",
    category: "traditional",
    example: `'Hello, World!'⎕←⍨⊢`,
    tokenizer: {
      tokenizer: {
        root: [
          [/[⎕←⍨⊢⍳∆⍴]/, "keyword"],
          [/'[^']*'/, "string"],
        ],
      },
    },
  },
  {
    id: "cobol",
    name: "COBOL",
    category: "traditional",
    example: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO.
       PROCEDURE DIVISION.
           DISPLAY "Hello, World!".
           STOP RUN.`,
    tokenizer: {
      tokenizer: {
        root: [
          [/\b(IDENTIFICATION|DIVISION|PROGRAM-ID|PROCEDURE|DISPLAY|STOP RUN)\b/, "keyword"],
          [/"[^"]*"/, "string"],
          [/\./, "delimiter"],
        ],
      },
    },
  },
  {
    id: "forth",
    name: "FORTH",
    category: "traditional",
    example: `: HELLO ." Hello, World!" CR ;
HELLO`,
    tokenizer: {
      tokenizer: {
        root: [
          [/:[^;]*;/, "keyword"],
          [/\."[^"]*"/, "string"],
          [/\b[A-Z]+\b/, "variable"],
        ],
      },
    },
  },
  {
    id: "lisp",
    name: "LISP",
    category: "traditional",
    example: `(format t "Hello, World!")`,
    tokenizer: {
      tokenizer: {
        root: [
          [/\(|\)/, "delimiter"],
          [/\b(format|defun|let|car|cdr|cons)\b/, "keyword"],
          [/"[^"]*"/, "string"],
        ],
      },
    },
  },
  {
    id: "prolog",
    name: "Prolog",
    category: "traditional",
    example: `main :- write('Hello, World!'), nl.`,
    tokenizer: {
      tokenizer: {
        root: [
          [/:-|\./, "delimiter"],
          [/\b(write|nl|is|member|append)\b/, "keyword"],
          [/'[^']*'/, "string"],
        ],
      },
    },
  },
  {
    id: "haskell",
    name: "Haskell",
    category: "traditional",
    example: `main = putStrLn "Hello, World!"`,
    tokenizer: {
      tokenizer: {
        root: [
          [/\b(where|let|in|case|of|class|data|type|import)\b/, "keyword"],
          [/"[^"]*"/, "string"],
          [/\b[a-z][a-zA-Z0-9_']*\b/, "variable"],
        ],
      },
    },
  },
  {
    id: "sql",
    name: "SQL",
    category: "traditional",
    example: `SELECT 'Hello, World!' AS greeting;`,
    tokenizer: {
      tokenizer: {
        root: [
          [/\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|DROP)\b/i, "keyword"],
          [/'[^']*'/, "string"],
          [/\b[A-Za-z][A-Za-z0-9_]*\b/, "variable"],
        ],
      },
    },
  }
];

export const categories = [...new Set(languages.map(lang => lang.category))];