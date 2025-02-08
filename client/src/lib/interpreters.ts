export async function executeCode(language: string, code: string): Promise<string> {
  switch (language) {
    case "brainfuck":
      return executeBrainfuck(code);
    case "ook":
      return executeOok(code);
    case "lolcode":
      return executeLolcode(code);
    case "whitespace":
      return executeWhitespace(code);
    case "befunge":
      return executeBefunge(code);
    case "emojicode":
      return executeEmojicode(code);
    case "false":
      return executeFalse(code);
    case "binary":
      return executeBinary(code);
    case "assembly":
      return executeAssembly(code);
    case "apl":
      return executeAPL(code);
    case "cobol":
      return executeCOBOL(code);
    case "forth":
      return executeForth(code);
    case "lisp":
      return executeLisp(code);
    case "prolog":
      return executeProlog(code);
    case "haskell":
      return executeHaskell(code);
    case "sql":
      return executeSQL(code);
    default:
      return `Language ${language} is view-only. Execution not implemented.\n\nCode:\n${code}`;
  }
}

function executeBrainfuck(code: string): string {
  const memory = new Uint8Array(30000);
  let pointer = 0;
  let output = "";
  let ip = 0;
  const loopStack: number[] = [];

  while (ip < code.length) {
    const instruction = code[ip];

    switch (instruction) {
      case ">":
        pointer = (pointer + 1) % memory.length;
        break;
      case "<":
        pointer = pointer - 1 < 0 ? memory.length - 1 : pointer - 1;
        break;
      case "+":
        memory[pointer] = (memory[pointer] + 1) % 256;
        break;
      case "-":
        memory[pointer] = memory[pointer] - 1 < 0 ? 255 : memory[pointer] - 1;
        break;
      case ".":
        output += String.fromCharCode(memory[pointer]);
        break;
      case ",":
        // Input not implemented
        break;
      case "[":
        if (memory[pointer] === 0) {
          let count = 1;
          while (count > 0) {
            ip++;
            if (ip >= code.length) {
              throw new Error("Unmatched [");
            }
            if (code[ip] === "[") count++;
            if (code[ip] === "]") count--;
          }
        } else {
          loopStack.push(ip);
        }
        break;
      case "]":
        if (loopStack.length === 0) {
          throw new Error("Unmatched ]");
        }
        if (memory[pointer] !== 0) {
          ip = loopStack[loopStack.length - 1];
        } else {
          loopStack.pop();
        }
        break;
    }
    ip++;
  }
  return output;
}

function executeOok(code: string): string {
  // Convert Ook! to Brainfuck
  const ookToBf: Record<string, string> = {
    "Ook. Ook?": ">",
    "Ook? Ook.": "<",
    "Ook. Ook.": "+",
    "Ook! Ook!": "-",
    "Ook! Ook.": ".",
    "Ook. Ook!": ",",
    "Ook! Ook?": "[",
    "Ook? Ook!": "]"
  };

  let bf = "";
  const matches = code.match(/Ook[\.\?\!]\s+Ook[\.\?\!]/g) || [];

  for (const match of matches) {
    bf += ookToBf[match] || "";
  }

  return executeBrainfuck(bf);
}

function executeLolcode(code: string): string {
  let output = "";
  const lines = code.split("\n");

  for (const line of lines) {
    if (line.trim().startsWith("VISIBLE")) {
      const match = line.match(/VISIBLE\s+"([^"]*)"/) || line.match(/VISIBLE\s+(.+)/);
      if (match) {
        output += match[1] + "\n";
      }
    }
  }

  return output;
}

function executeWhitespace(code: string): string {
  // Simple whitespace interpreter - only handles basic stack operations
  const stack: number[] = [];
  let output = "";

  for (let i = 0; i < code.length; i++) {
    if (code[i] === " ") {
      stack.push(1);
    } else if (code[i] === "\t") {
      if (stack.length > 0) {
        output += String.fromCharCode(stack.pop()!);
      }
    }
  }

  return output || "Whitespace execution complete";
}

function executeBefunge(code: string): string {
  const width = Math.max(...code.split("\n").map(line => line.length));
  const height = code.split("\n").length;
  const grid = Array(height).fill(0).map(() => Array(width).fill(" "));

  // Load program into grid
  code.split("\n").forEach((line, y) => {
    [...line].forEach((char, x) => {
      grid[y][x] = char;
    });
  });

  let x = 0, y = 0;
  let dx = 1, dy = 0;
  let output = "";
  const stack: number[] = [];
  let stringMode = false;

  for (let steps = 0; steps < 10000; steps++) { // Limit execution steps
    const char = grid[y][x];

    if (char === "@") break;

    if (stringMode) {
      if (char === '"') {
        stringMode = false;
      } else {
        stack.push(char.charCodeAt(0));
      }
    } else {
      switch (char) {
        case ">": dx = 1; dy = 0; break;
        case "<": dx = -1; dy = 0; break;
        case "^": dx = 0; dy = -1; break;
        case "v": dx = 0; dy = 1; break;
        case "+": {
          const b = stack.pop() || 0;
          const a = stack.pop() || 0;
          stack.push(a + b);
          break;
        }
        case ".":
          output += (stack.pop() || 0).toString() + " ";
          break;
        case ",":
          output += String.fromCharCode(stack.pop() || 0);
          break;
        case '"':
          stringMode = true;
          break;
        default:
          if (/[0-9]/.test(char)) {
            stack.push(parseInt(char));
          }
      }
    }

    x = (x + dx + width) % width;
    y = (y + dy + height) % height;
  }

  return output;
}

function executeEmojicode(code: string): string {
  let output = "";
  const lines = code.split("\n");

  for (const line of lines) {
    if (line.includes("😀")) {
      const match = line.match(/🔤([^🔤]*)🔤/);
      if (match) {
        output += match[1] + "\n";
      }
    }
  }

  return output;
}

function executeFalse(code: string): string {
  let output = "";
  const stack: (number | string)[] = [];

  for (let i = 0; i < code.length; i++) {
    const char = code[i];

    if (char === '"') {
      let str = "";
      i++;
      while (i < code.length && code[i] !== '"') {
        str += code[i];
        i++;
      }
      output += str;
    } else if (char === '$') {
      const value = stack.pop();
      if (value !== undefined) {
        output += value;
      }
    }
  }

  return output;
}

function executeBinary(code: string): string {
  const bytes = code.trim().split(/\s+/).map(bin => parseInt(bin, 2));
  return bytes.map(byte => String.fromCharCode(byte)).join('');
}

function executeAssembly(code: string): string {
  return "Assembly execution requires a runtime environment.\nCode preview:\n" + code;
}

function executeAPL(code: string): string {
  let output = "";
  const lines = code.split("\n");

  for (const line of lines) {
    if (line.includes("'")) {
      const match = line.match(/'([^']*)'/) || ["", ""];
      output += match[1] + "\n";
    }
  }

  return output;
}

function executeCOBOL(code: string): string {
  let output = "";
  const lines = code.split("\n");

  for (const line of lines) {
    if (line.includes("DISPLAY")) {
      const match = line.match(/"([^"]*)"/) || ["", ""];
      output += match[1] + "\n";
    }
  }

  return output;
}

function executeForth(code: string): string {
  let output = "";
  const lines = code.split("\n");

  for (const line of lines) {
    if (line.includes('."')) {
      const match = line.match(/"([^"]*)"/) || ["", ""];
      output += match[1] + "\n";
    }
  }

  return output;
}

function executeLisp(code: string): string {
  let output = "";
  const match = code.match(/"([^"]*)"/) || ["", ""];
  output = match[1];

  return output;
}

function executeProlog(code: string): string {
  let output = "";
  const lines = code.split("\n");

  for (const line of lines) {
    if (line.includes("write")) {
      const match = line.match(/'([^']*)'/) || ["", ""];
      output += match[1] + "\n";
    }
  }

  return output;
}

function executeHaskell(code: string): string {
  let output = "";
  const match = code.match(/"([^"]*)"/) || ["", ""];
  output = match[1];

  return output;
}

function executeSQL(code: string): string {
  let output = "";
  const match = code.match(/'([^']*)'/) || ["", ""];
  output = match[1];

  return output;
}

function executeCow(code: string): string {
  // Simple COW interpreter - handles basic MOO operations
  let output = "";
  const tokens = code.match(/[Mm][Oo][Oo]/g) || [];

  tokens.forEach((token, i) => {
    if (token === "MOO") {
      output += "o";
    } else if (token === "moo") {
      output += "O";
    } else if (token === "moO") {
      output += " ";
    }
  });

  return output || "COW execution complete";
}

function executeArnoldC(code: string): string {
  let output = "";
  const lines = code.split("\n");

  for (const line of lines) {
    if (line.includes("TALK TO THE HAND")) {
      const match = line.match(/"([^"]*)"/) || ["", ""];
      output += match[1] + "\n";
    }
  }

  return output;
}

function executeHQ9Plus(code: string): string {
  let output = "";

  for (const char of code) {
    switch (char) {
      case "H":
        output += "Hello, World!\n";
        break;
      case "Q":
        output += code;
        break;
      case "9":
        output += "99 Bottles of Beer lyrics\n"; // Simplified version
        break;
      case "+":
        output += "Accumulator incremented\n";
        break;
    }
  }

  return output;
}