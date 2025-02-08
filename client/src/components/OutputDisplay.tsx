import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

interface OutputDisplayProps {
  content: string;
}

export default function OutputDisplay({ content }: OutputDisplayProps) {
  return (
    <ScrollArea className="h-[600px] w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="p-4"
        >
          <pre className="font-mono text-sm whitespace-pre-wrap break-words">
            {content || "No output"}
          </pre>
        </motion.div>
      </AnimatePresence>
    </ScrollArea>
  );
}