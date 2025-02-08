import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type SharedProgram = {
  id: string;
  title: string;
  description: string;
  author: string;
  language: string;
  createdAt: string;
}

const mockPrograms: SharedProgram[] = [
  {
    id: "1",
    title: "Brainfuck Calculator",
    description: "A simple calculator implemented in Brainfuck",
    author: "MoleratDev",
    language: "Brainfuck",
    createdAt: "2025-02-08",
  },
  // Add more mock programs as needed
];

export default function SharedPage() {
  return (
    <div className="container py-8 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Community Showcase (Alpha)</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPrograms.map((program) => (
          <Card key={program.id}>
            <CardHeader>
              <CardTitle>{program.title}</CardTitle>
              <CardDescription>{program.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Language: {program.language}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Made by {program.author}
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date(program.createdAt).toLocaleDateString()}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
