import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const examples = [
  {
    title: "Hello World",
    language: "Brainfuck",
    code: "++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.",
    description: "Classic Hello World program in Brainfuck"
  },
  {
    title: "Number Counter",
    language: "LOLCODE",
    code: `HAI 1.2
VISIBLE "COUNTING UP:"
I HAS A COUNT ITZ 1
IM IN YR LOOP UPPIN YR COUNT TIL BOTH SAEM COUNT AN 11
  VISIBLE COUNT
IM OUTTA YR LOOP
KTHXBYE`,
    description: "A simple counter program in LOLCODE"
  },
];

export default function Examples() {
  return (
    <div className="container py-8 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Example Programs</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{example.title}</CardTitle>
              <CardDescription>{example.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Language: {example.language}
              </div>
              <pre className="mt-4 p-4 bg-muted rounded-md overflow-x-auto">
                <code>{example.code}</code>
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
