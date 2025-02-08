import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import CodeEditor from "@/components/CodeEditor";
import LanguageSelect from "@/components/LanguageSelect";
import OutputDisplay from "@/components/OutputDisplay";
import { languages } from "@/lib/languages";
import { executeCode } from "@/lib/interpreters";
import { loadCode, saveCode } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Save } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0].id);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedCode = loadCode(selectedLanguage);
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(languages.find(l => l.id === selectedLanguage)?.example || "");
    }
  }, [selectedLanguage]);

  const handleRun = async () => {
    try {
      const result = await executeCode(selectedLanguage, code);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      toast({
        variant: "destructive",
        title: "Execution Error",
        description: error.message
      });
    }
  };

  const handleSave = () => {
    saveCode(selectedLanguage, code);
    toast({
      title: "Saved",
      description: "Your code has been saved locally"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Esoteric Code Sandbox</h1>
          <p className="text-muted-foreground mb-6">
            Explore and experiment with unusual and historical programming languages
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 flex-wrap">
              <LanguageSelect
                value={selectedLanguage}
                onChange={setSelectedLanguage}
              />
              <Button 
                onClick={handleRun} 
                className="gap-2"
                size="lg"
              >
                <Play className="w-4 h-4" />
                Run
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSave} 
                className="gap-2"
                size="lg"
              >
                <Save className="w-4 h-4" />
                Save
              </Button>
            </div>

            <Card className="p-0 overflow-hidden border-2 transition-colors hover:border-primary/50">
              <CodeEditor
                language={selectedLanguage}
                value={code}
                onChange={setCode}
              />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="h-full">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Output</h2>
              </div>
              <OutputDisplay content={output} />
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}