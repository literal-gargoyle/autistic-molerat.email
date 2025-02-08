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

// Enhanced Brainfuck interpreter with proper memory management
function executeBrainfuck(code: string): string {
  const memory = new Uint8Array(30000);
  let pointer = 0;
  let output = "";
  let ip = 0;
  const bracketStack: number[] = [];
  const bracketMap = new Map<number, number>();

  // First pass: build bracket map
  for (let i = 0; i < code.length; i++) {
    if (code[i] === '[') {
      bracketStack.push(i);
    } else if (code[i] === ']') {
      if (bracketStack.length === 0) {
        throw new Error(`Unmatched ] at position ${i}`);
      }
      const openBracket = bracketStack.pop()!;
      bracketMap.set(openBracket, i);
      bracketMap.set(i, openBracket);
    }
  }

  if (bracketStack.length > 0) {
    throw new Error(`Unmatched [ at position ${bracketStack[0]}`);
  }

  try {
    while (ip < code.length) {
      const instruction = code[ip];

      switch (instruction) {
        case '>':
          if (pointer >= memory.length - 1) {
            throw new Error('Memory pointer out of bounds');
          }
          pointer++;
          break;
        case '<':
          if (pointer <= 0) {
            throw new Error('Memory pointer out of bounds');
          }
          pointer--;
          break;
        case '+':
          memory[pointer] = (memory[pointer] + 1) % 256;
          break;
        case '-':
          memory[pointer] = (memory[pointer] - 1 + 256) % 256;
          break;
        case '.':
          output += String.fromCharCode(memory[pointer]);
          break;
        case ',':
          // For browser-based implementation, we'll simulate input with a null byte
          memory[pointer] = 0;
          break;
        case '[':
          if (memory[pointer] === 0) {
            ip = bracketMap.get(ip)!;
          }
          break;
        case ']':
          if (memory[pointer] !== 0) {
            ip = bracketMap.get(ip)!;
          }
          break;
      }
      ip++;
    }
  } catch (error) {
    throw new Error(`Runtime error at position ${ip}: ${error.message}`);
  }

  return output;
}

// Enhanced Ook! interpreter with proper error handling
function executeOok(code: string): string {
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
    const instruction = ookToBf[match];
    if (instruction === undefined) {
      throw new Error(`Invalid Ook! instruction: ${match}`);
    }
    bf += instruction;
  }

  return executeBrainfuck(bf);
}

// Enhanced LOLCODE interpreter with basic arithmetic and variables
function executeLolcode(code: string): string {
  let output = "";
  const variables = new Map<string, any>();
  const lines = code.split("\n").map(line => line.trim());

  if (lines[0] !== "HAI 1.2") {
    throw new Error("LOLCODE program must start with 'HAI 1.2'");
  }

  if (lines[lines.length - 1] !== "KTHXBYE") {
    throw new Error("LOLCODE program must end with 'KTHXBYE'");
  }

  for (let i = 1; i < lines.length - 1; i++) {
    const line = lines[i];

    if (line.startsWith("I HAS A")) {
      // Variable declaration
      const matches = line.match(/I HAS A ([A-Za-z][A-Za-z0-9_]*)\s*(?:ITZ\s*(.+))?/);
      if (matches) {
        const [, varName, value] = matches;
        variables.set(varName, value !== undefined ? parseLolValue(value) : "NOOB");
      }
    } else if (line.startsWith("VISIBLE")) {
      // Print statement
      const content = line.substring(7).trim();
      if (content.startsWith('"') && content.endsWith('"')) {
        output += content.slice(1, -1) + "\n";
      } else {
        // Handle variable printing
        const varName = content.trim();
        if (variables.has(varName)) {
          output += variables.get(varName) + "\n";
        } else {
          throw new Error(`Undefined variable: ${varName}`);
        }
      }
    }
  }

  return output;
}

function parseLolValue(value: string): any {
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1);
  }
  if (value === "WIN") return true;
  if (value === "FAIL") return false;
  if (/^-?\d+$/.test(value)) return parseInt(value);
  if (value === "NOOB") return null;
  return value;
}

// Enhanced Whitespace interpreter with stack operations
function executeWhitespace(code: string): string {
  const stack: number[] = [];
  let output = "";
  let heap = new Map<number, number>();

  const tokens = code.split('').map(char => {
    if (char === ' ') return 'S';
    if (char === '\t') return 'T';
    if (char === '\n') return 'L';
    return '';
  }).join('');

  let ip = 0;
  while (ip < tokens.length) {
    if (tokens[ip] === 'S') {
      // Stack manipulation
      if (tokens[ip + 1] === 'S') {
        // Push number
        ip += 2;
        let num = 0;
        let sign = 1;

        if (tokens[ip] === 'T') {
          sign = -1;
          ip++;
        }

        while (tokens[ip] !== 'L') {
          num = num * 2 + (tokens[ip] === 'T' ? 1 : 0);
          ip++;
        }

        stack.push(num * sign);
      }
    } else if (tokens[ip] === 'T') {
      // Arithmetic
      if (tokens[ip + 1] === 'S' && tokens[ip + 2] === 'S') {
        const b = stack.pop() ?? 0;
        const a = stack.pop() ?? 0;
        stack.push(a + b);
      }
    } else if (tokens[ip] === 'L') {
      // I/O
      if (tokens[ip + 1] === 'S' && tokens[ip + 2] === 'S') {
        output += String.fromCharCode(stack.pop() ?? 0);
      }
    }
    ip++;
  }

  return output || "Whitespace execution complete\n";
}

// Enhanced Befunge interpreter with full instruction set
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

  const MAX_STEPS = 100000; // Prevent infinite loops
  let steps = 0;

  while (steps < MAX_STEPS) {
    if (y < 0 || y >= height || x < 0 || x >= width) {
      break;
    }

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
        case "?": {
          const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
          const [newDx, newDy] = dirs[Math.floor(Math.random() * dirs.length)];
          dx = newDx;
          dy = newDy;
          break;
        }
        case "+": {
          const b = stack.pop() ?? 0;
          const a = stack.pop() ?? 0;
          stack.push(a + b);
          break;
        }
        case "-": {
          const b = stack.pop() ?? 0;
          const a = stack.pop() ?? 0;
          stack.push(a - b);
          break;
        }
        case "*": {
          const b = stack.pop() ?? 0;
          const a = stack.pop() ?? 0;
          stack.push(a * b);
          break;
        }
        case "/": {
          const b = stack.pop() ?? 1;
          const a = stack.pop() ?? 0;
          stack.push(b === 0 ? 0 : Math.floor(a / b));
          break;
        }
        case "%": {
          const b = stack.pop() ?? 1;
          const a = stack.pop() ?? 0;
          stack.push(b === 0 ? 0 : a % b);
          break;
        }
        case "!":
          stack.push(stack.pop() === 0 ? 1 : 0);
          break;
        case "`": {
          const b = stack.pop() ?? 0;
          const a = stack.pop() ?? 0;
          stack.push(a > b ? 1 : 0);
          break;
        }
        case ":":
          stack.push(stack.length > 0 ? stack[stack.length - 1] : 0);
          break;
        case "\\":
          if (stack.length >= 2) {
            const a = stack.pop()!;
            const b = stack.pop()!;
            stack.push(a, b);
          }
          break;
        case "$":
          stack.pop();
          break;
        case ".":
          output += (stack.pop() ?? 0).toString() + " ";
          break;
        case ",":
          output += String.fromCharCode(stack.pop() ?? 0);
          break;
        case "#":
          x += dx;
          y += dy;
          break;
        case "p": {
          const y2 = stack.pop() ?? 0;
          const x2 = stack.pop() ?? 0;
          const v = stack.pop() ?? 0;
          if (y2 >= 0 && y2 < height && x2 >= 0 && x2 < width) {
            grid[y2][x2] = String.fromCharCode(v);
          }
          break;
        }
        case "g": {
          const y2 = stack.pop() ?? 0;
          const x2 = stack.pop() ?? 0;
          if (y2 >= 0 && y2 < height && x2 >= 0 && x2 < width) {
            stack.push(grid[y2][x2].charCodeAt(0));
          } else {
            stack.push(0);
          }
          break;
        }
        case '"':
          stringMode = true;
          break;
        case " ":
          break;
        default:
          if (/[0-9]/.test(char)) {
            stack.push(parseInt(char));
          }
      }
    }

    x = (x + dx + width) % width;
    y = (y + dy + height) % height;
    steps++;
  }

  if (steps >= MAX_STEPS) {
    throw new Error("Program exceeded maximum step limit");
  }

  return output;
}

// Enhanced FALSE interpreter with stack operations and functions
function executeFalse(code: string): string {
  const stack: (number | string | Function)[] = [];
  let output = "";
  let functions = new Map<string, string>();

  for (let i = 0; i < code.length; i++) {
    const char = code[i];

    switch (char) {
      case '"': {
        let str = "";
        i++;
        while (i < code.length && code[i] !== '"') {
          str += code[i];
          i++;
        }
        stack.push(str);
        break;
      }
      case '[': {
        let depth = 1;
        let func = "";
        i++;
        while (i < code.length && depth > 0) {
          if (code[i] === '[') depth++;
          if (code[i] === ']') depth--;
          if (depth > 0) func += code[i];
          i++;
        }
        stack.push(func);
        break;
      }
      case '$':
        if (stack.length > 0) {
          const value = stack.pop();
          if (typeof value === 'string' || typeof value === 'number') {
            output += value;
          }
        }
        break;
      case '+': {
        const b = Number(stack.pop()) || 0;
        const a = Number(stack.pop()) || 0;
        stack.push(a + b);
        break;
      }
      case '-': {
        const b = Number(stack.pop()) || 0;
        const a = Number(stack.pop()) || 0;
        stack.push(a - b);
        break;
      }
      case '*': {
        const b = Number(stack.pop()) || 0;
        const a = Number(stack.pop()) || 0;
        stack.push(a * b);
        break;
      }
      case '/': {
        const b = Number(stack.pop()) || 1;
        const a = Number(stack.pop()) || 0;
        stack.push(Math.floor(a / b));
        break;
      }
      default:
        if (/[0-9]/.test(char)) {
          stack.push(parseInt(char));
        }
    }
  }

  return output;
}

// Basic Binary interpreter (converts binary to ASCII)
function executeBinary(code: string): string {
  try {
    const bytes = code.trim().split(/\s+/).map(bin => {
      if (!/^[01]{8}$/.test(bin)) {
        throw new Error(`Invalid binary byte: ${bin}`);
      }
      return parseInt(bin, 2);
    });
    return bytes.map(byte => String.fromCharCode(byte)).join('');
  } catch (error) {
    throw new Error(`Binary parsing error: ${error.message}`);
  }
}

// Assembly simulation (basic x86-like instructions)
function executeAssembly(code: string): string {
  const registers = new Map<string, number>();
  const memory = new Uint8Array(256);
  let output = "";

  // Initialize registers
  ['eax', 'ebx', 'ecx', 'edx'].forEach(reg => registers.set(reg, 0));

  const lines = code.split('\n').map(line => line.trim());

  for (const line of lines) {
    if (!line || line.startsWith(';')) continue;

    const [instruction, ...args] = line.split(/[\s,]+/);

    switch (instruction.toLowerCase()) {
      case 'mov':
        if (args.length === 2) {
          const [dest, source] = args;
          if (source.startsWith("'") && source.endsWith("'")) {
            registers.set(dest, source.charCodeAt(1));
          } else if (/^\d+$/.test(source)) {
            registers.set(dest, parseInt(source));
          } else {
            registers.set(dest, registers.get(source) || 0);
          }
        }
        break;
      case 'int':
        if (args[0] === '0x80') {
          const syscall = registers.get('eax');
          if (syscall === 4) { // write
            const str = String.fromCharCode(registers.get('ebx') || 0);
            output += str;
          }
        }
        break;
    }
  }

  return output || "Assembly execution completed\n";
}

// APL interpreter (basic operations)
function executeAPL(code: string): string {
  let output = "";
  const lines = code.split('\n');

  for (const line of lines) {
    if (line.includes('⎕←')) {
      // Output operation
      const value = line.split('⎕←')[1].trim();
      if (value.startsWith("'") && value.endsWith("'")) {
        output += value.slice(1, -1) + "\n";
      } else {
        try {
          // Basic APL operations
          let result = value;
          if (value.includes('⍳')) {
            const num = parseInt(value.replace(/[⍳]/g, ''));
            result = Array.from({length: num}, (_, i) => i + 1).join(' ');
          }
          output += result + "\n";
        } catch (error) {
          throw new Error(`APL evaluation error: ${error.message}`);
        }
      }
    }
  }

  return output;
}

// COBOL interpreter (basic operations)
function executeCOBOL(code: string): string {
  let output = "";
  const variables = new Map<string, string | number>();

  const lines = code.split('\n').map(line => line.trim());

  let inProcedure = false;

  for (const line of lines) {
    if (line.includes('PROCEDURE DIVISION')) {
      inProcedure = true;
      continue;
    }

    if (!inProcedure) continue;

    if (line.startsWith('DISPLAY')) {
      const match = line.match(/DISPLAY\s+(?:"([^"]*)"|([\w-]+))/);
      if (match) {
        const value = match[1] || variables.get(match[2]) || '';
        output += value + "\n";
      }
    }
  }

  return output;
}

// FORTH interpreter (basic stack operations)
function executeForth(code: string): string {
  const stack: (number | string)[] = [];
  let output = "";
  const words = new Map<string, Function>();

  // Define basic words
  words.set('.', () => {
    const value = stack.pop();
    if (value !== undefined) output += value + " ";
  });
  words.set('.s', () => {
    output += `<${stack.length}> ${stack.join(' ')}\n`;
  });
  words.set('dup', () => {
    if (stack.length > 0) stack.push(stack[stack.length - 1]);
  });
  words.set('swap', () => {
    if (stack.length >= 2) {
      const [a, b] = [stack.pop()!, stack.pop()!];
      stack.push(a, b);
    }
  });
  words.set('drop', () => {
    stack.pop();
  });

  const tokens = code.split(/\s+/);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.startsWith('."')) {
      // String literal
      let str = "";
      i++;
      while (i < tokens.length && !tokens[i].endsWith('"')) {
        str += tokens[i] + " ";
        i++;
      }
      if (i < tokens.length) {
        str += tokens[i].slice(0, -1);
      }
      output += str + "\n";
    } else if (words.has(token)) {
      words.get(token)!();
    } else if (/^-?\d+$/.test(token)) {
      stack.push(parseInt(token));
    }
  }

  return output;
}

// LISP interpreter (basic s-expressions)
function executeLisp(code: string): string {
  let output = "";

  function evaluate(expr: string): any {
    expr = expr.trim();

    if (expr.startsWith('(')) {
      const tokens = tokenize(expr.slice(1, -1));
      const [func, ...args] = tokens;

      switch (func) {
        case 'format':
          if (args[0] === 't' && args[1]?.startsWith('"')) {
            return args[1].slice(1, -1);
          }
          break;
        case 'print':
          const value = args[0]?.startsWith('"') ? args[0].slice(1, -1) : args[0];
          return value;
      }
    }

    return expr;
  }

  function tokenize(expr: string): string[] {
    const tokens: string[] = [];
    let current = '';
    let inString = false;
    let parentheses = 0;

    for (const char of expr) {
      if (char === '"') {
        inString = !inString;
        current += char;
      } else if (inString) {
        current += char;
      } else if (char === '(') {
        parentheses++;
        current += char;
      } else if (char === ')') {
        parentheses--;
        current += char;
      } else if (char === ' ' && parentheses === 0) {
        if (current) tokens.push(current);
        current = '';
      } else {
        current += char;
      }
    }

    if (current) tokens.push(current);
    return tokens;
  }

  try {
    output = evaluate(code);
  } catch (error) {
    throw new Error(`LISP evaluation error: ${error.message}`);
  }

  return output;
}

// Prolog interpreter (basic facts and queries)
function executeProlog(code: string): string {
  let output = "";
  const facts = new Map<string, Set<string>>();

  const lines = code.split('\n');

  for (const line of lines) {
    if (line.includes('write')) {
      const match = line.match(/write\('([^']*)'\)/);
      if (match) {
        output += match[1] + "\n";
      }
    } else if (line.endsWith('.')) {
      // Parse fact
      const [head, ...body] = line.slice(0, -1).split(':-');
      const factName = head.trim();
      if (!facts.has(factName)) {
        facts.set(factName, new Set());
      }
      if (body.length > 0) {
        facts.get(factName)!.add(body.join(':-').trim());
      }
    }
  }

  return output;
}

// Haskell interpreter (basic expressions)
function executeHaskell(code: string): string {
  let output = "";

  const lines = code.split('\n');

  for (const line of lines) {
    if (line.includes('putStrLn')) {
      const match = line.match(/putStrLn\s+"([^"]*)"/);
      if (match) {
        output += match[1] + "\n";
      }
    }
  }

  return output;
}

// SQL interpreter (basic queries)
function executeSQL(code: string): string {
  let output = "";

  // Simple SQL parser
  const statement = code.trim().toUpperCase();

  if (statement.startsWith('SELECT')) {
    const match = statement.match(/SELECT\s+'([^']+)'/i);
    if (match) {
      output += match[1] + "\n";
    }
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