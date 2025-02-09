import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiMoleculer } from "react-icons/si";

type SharedProgram = {
  id: string;
  link: string;
  title: string;
  description: string;
  author: string;
  language: string;
  createdAt: string;
}

const mockPrograms: SharedProgram[] = [
  {
    id: "1",
    link: "http://localhost:5000/share/dilokAtttO",
    title: "LC Test Program",
    description: "A simple BF Test Program",
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
      <h1 className="text-3xl font-bold flex items-center">
        Community Showcase
        <Badge variant="destructive" className="ml-2 flex items-center">Alpha</Badge>
      </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPrograms.map((program) => (
            <a href={program.link} key={program.id} className="block">
            <Card>
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
            </a>
        ))}
      </div>
    </div>
  );
}
