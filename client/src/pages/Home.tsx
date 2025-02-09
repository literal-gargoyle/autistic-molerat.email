import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import CodeEditor from "@/components/CodeEditor";
import LanguageSelect from "@/components/LanguageSelect";
import OutputDisplay from "@/components/OutputDisplay";
import { languages } from "@/lib/languages";
import { executeCode } from "@/lib/interpreters";
import { loadCode, saveCode } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Play, Save, Share } from "lucide-react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";

console.log("AUTISM TIME BABY🪇🪇")
export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0].id);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const savedCode = loadCode(selectedLanguage);
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(languages.find(l => l.id === selectedLanguage)?.example || "");
    }
  }, [selectedLanguage]);

  const handleRun = async () => {
    console.log("How fitting, this code has errors on the error lines.")
    try {
      const result = await executeCode(selectedLanguage, code);
      setOutput(result);
    } catch (error) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`);
        toast({
          variant: "destructive",
          title: "Execution Error",
          description: error.message
        });
      } else {
        setOutput("An unknown error occurred");
        toast({
          variant: "destructive",
          title: "Execution Error",
          description: "An unknown error occurred"
        });
      }
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

  const shareMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/share', {
        language: selectedLanguage,
        code,
        title,
        description
      });
      return await response.json();
    },
    onSuccess: (data) => {
      setShareDialogOpen(false);
      setLocation(`/share/${data.shareId}`);
      toast({
        title: "Shared Successfully",
        description: "Your code has been shared and can now be accessed via URL"
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Share Error",
        description: error.message
      });
    }
  });

  const handleShare = () => {
    if (!title) {
      toast({
        variant: "destructive",
        title: "Title Required",
        description: "Please provide a title for your code"
      });
      return;
    }
    shareMutation.mutate();
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
              <Button
                variant="outline"
                onClick={() => setShareDialogOpen(true)}
                className="gap-2"
                size="lg"
              >
                <Share className="w-4 h-4" />
                Share
              </Button>
            </div>

            <Card className="p-0 overflow-hidden border-2 transition-colors hover:border-primary/50">
              <CodeEditor
                language={selectedLanguage}
                value={code}
                onChange={setCode} code={""} readOnly={false}              />
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

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Code</DialogTitle>
            <DialogDescription>
              Share your code with others. They'll be able to view and run it.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for your code"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description"
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setShareDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleShare}
                disabled={shareMutation.isPending}
              >
                {shareMutation.isPending ? "Sharing..." : "Share"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}