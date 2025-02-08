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
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Esoteric Code Sandbox</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <LanguageSelect
                value={selectedLanguage}
                onChange={setSelectedLanguage}
              />
              <Button onClick={handleRun} className="gap-2">
                <Play className="w-4 h-4" />
                Run
              </Button>
              <Button variant="outline" onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Save
              </Button>
            </div>
            
            <Card className="p-0">
              <CodeEditor
                language={selectedLanguage}
                value={code}
                onChange={setCode}
              />
            </Card>
          </div>
          
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-2">Output</h2>
            <OutputDisplay content={output} />
          </Card>
        </div>
      </div>
    </div>
  );
}
