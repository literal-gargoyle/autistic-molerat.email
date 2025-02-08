import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { languages, categories } from "@/lib/languages";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  const [search, setSearch] = useState("");

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(search.toLowerCase())
  );

  const groupedLanguages = categories.map(category => ({
    category,
    languages: filteredLanguages.filter(lang => lang.category === category)
  }));

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <div className="p-2">
          <Input
            placeholder="Search languages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2"
          />
        </div>
        <ScrollArea className="h-[300px]">
          {groupedLanguages.map(group => (
            <div key={group.category}>
              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                {group.category.charAt(0).toUpperCase() + group.category.slice(1)}
              </div>
              {group.languages.map((lang) => (
                <SelectItem
                  key={lang.id}
                  value={lang.id}
                  className={cn(
                    "cursor-pointer",
                    value === lang.id && "bg-accent text-accent-foreground"
                  )}
                >
                  {lang.name}
                </SelectItem>
              ))}
            </div>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}