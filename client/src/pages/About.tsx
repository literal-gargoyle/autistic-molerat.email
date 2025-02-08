import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">About Esoteric Code Sandbox</h1>
      <Card>
        <CardContent className="prose dark:prose-invert pt-6">
          <p>
            Welcome to the Esoteric Code Sandbox, a playground for exploring unusual
            and historical programming languages. This project aims to preserve and
            celebrate the diversity of programming languages, from the practical to
            the peculiar.
          </p>
          
          <h2>Featured Languages</h2>
          <ul>
            <li>Esoteric Languages: Brainfuck, Ook!, LOLCODE, Whitespace, and more</li>
            <li>Historical Languages: COBOL, FORTRAN, Assembly</li>
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
            programming paradigms.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
