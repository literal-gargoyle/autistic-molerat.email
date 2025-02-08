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
    example: `Ook. Ook? Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook.`,
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
          [/HAI|KTHXBYE|CAN HAS|VISIBLE/, "keyword"],
          [/"[^"]*"/, "string"],
          [/[A-Za-z][A-Za-z0-9_]*/, "variable"],
        ],
      },
    },
  },
  {
    id: "whitespace",
    name: "Whitespace",
    example: `   	  	   
	
     		  	 	
	
     		 		  
	
     		 		  
	
     		 				
	
     	     
	
  `,
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
  }
];
