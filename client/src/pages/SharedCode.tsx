import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import type { SharedCode } from "@shared/schema";
import CodeEditor from "@/components/CodeEditor";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SharedCode() {
  const [, params] = useRoute<{ id: string }>("/share/:id");
  const shareId = params?.id;

  const { data: shared, isLoading, error } = useQuery<SharedCode>({
    queryKey: ['/api/share/' + shareId],
    enabled: !!shareId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  if (error || !shared) {
    return (
      <div className="container mx-auto p-4">
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-destructive mb-2">Error</h1>
          <p className="text-muted-foreground">
            {error?.message || "Shared code not found"}
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{shared.title}</h1>
        {shared.description && (
          <p className="text-muted-foreground">{shared.description}</p>
        )}
      </div>

      <Card className="p-0 overflow-hidden border-2">
        <CodeEditor
          language={shared.language}
          value={shared.code}
          onChange={() => {}}
          readOnly
        />
      </Card>
    </div>
  );
}
