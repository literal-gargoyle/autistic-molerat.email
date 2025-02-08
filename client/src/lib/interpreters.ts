export async function executeCode(language: string, code: string): Promise<string> {
  switch (language) {
    case "brainfuck":
      return executeBrainfuck(code);
    default:
      return `Execution not implemented for ${language}\n\nCode:\n${code}`;
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
