import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type SharedProgram = {
  id: string;
  language: string;
  code: string;
  createdBy?: string;
  createdAt: string;
};

export default function SharedPage() {
  const { data: programs, isLoading } = useQuery<SharedProgram[]>({
    queryKey: ['/api/share'],
  });

  if (isLoading) {
    return (
      <div className="container py-8 space-y-4">
        <h1 className="text-3xl font-bold">Shared Programs</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-3 w-[150px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-4">
      <h1 className="text-3xl font-bold">Shared Programs</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {programs?.map((program) => (
          <Link href={`/shared/${program.id}`} key={program.id}>
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle>{program.language}</CardTitle>
                <CardDescription>
                  {program.createdBy ? `by ${program.createdBy}` : 'Anonymous'} • {
                    new Date(program.createdAt).toLocaleDateString()
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="text-sm overflow-hidden max-h-24">
                  {program.code}
                </pre>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
