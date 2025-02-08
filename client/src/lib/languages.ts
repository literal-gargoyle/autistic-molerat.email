export const languages = [
  {
    id: "brainfuck",
    name: "Brainfuck",
    example: `++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.`,
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
    id: "cow",
    name: "COW",
    example: `MoO MoO MoO MoO MoO MoO MoO MoO MOO moO MOo MOo MOo MOo MOo MOo MOo MOo MOo MOo MOo MOo MOo MOo MOo MOo MOo MOo MOo MOo MOo MOo MOo MOo MOo MOo MOo MOo mOo MOo mOo MOo moo moO MOO mOo MoO moO`,
    tokenizer: {
      tokenizer: {
        root: [
          [/[Mm][Oo][Oo]/, "keyword"],
          [/[^MmOo\s]+/, "comment"],
        ],
      },
    },
  },
  {
    id: "arnoldc",
    name: "ArnoldC",
    example: `IT'S SHOWTIME
TALK TO THE HAND "Hello, World!"
YOU HAVE BEEN TERMINATED`,
    tokenizer: {
      tokenizer: {
        root: [
          [/IT'S SHOWTIME|TALK TO THE HAND|YOU HAVE BEEN TERMINATED/, "keyword"],
          [/"[^"]*"/, "string"],
          [/[A-Za-z][A-Za-z0-9_\s]*/, "variable"],
        ],
      },
    },
  },
  {
    id: "hq9plus",
    name: "HQ9+",
    example: `H`,
    tokenizer: {
      tokenizer: {
        root: [
          [/[HQ9+]/, "keyword"],
          [/[^HQ9+\s]+/, "comment"],
        ],
      },
    },
  }
];