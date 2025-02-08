import { ScrollArea } from "@/components/ui/scroll-area";

interface OutputDisplayProps {
  content: string;
}

export default function OutputDisplay({ content }: OutputDisplayProps) {
  return (
    <ScrollArea className="h-[600px] w-full">
      <pre className="font-mono text-sm whitespace-pre-wrap break-words p-4">
        {content || "No output"}
      </pre>
    </ScrollArea>
  );
}
