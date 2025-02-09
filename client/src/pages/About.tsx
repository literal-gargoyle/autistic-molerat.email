import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardContent className="prose dark:prose-invert pt-6">
        <h1 className="text-3xl font-bold mb-6">About The Project:</h1>
          <p>
            This is a esoteric programming language (and basic language) playground where you can share your code with others.
          </p>
          
          <h2>Featured Languages</h2>
          <ul>
            <li>Esoteric Languages: Brainfuck, Ook!, LOLCODE, Whitespace, Befunge, EmojiCode, and False.</li>
            <li>Historical Languages: Binary, Assembly, APL, FORTH, LISP,</li>
            <li>Modern Languages: SQL, Haskell, Prolog</li>
          </ul>

          <h2>How It Works</h2>
          <p>
            The sandbox provides a browser-based environment for writing and executing
            code in various programming languages. While some languages are fully
            supported with execution capabilities, others are available for educational
            purposes with syntax highlighting.
          </p>

          <h2>Contributing</h2>
          <p>
            This is an open-source project dedicated to preserving programming
            language history and encouraging experimentation with different
            programming paradigms. Check out the github repository to contribute! (it's in the contact section!)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
