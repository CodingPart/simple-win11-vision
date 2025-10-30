import { useState, useRef } from "react";
import { Search, ArrowLeft, ArrowRight, RotateCw, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Browser = () => {
  const [url, setUrl] = useState("https://www.google.com");
  const [inputValue, setInputValue] = useState("https://www.google.com");
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleNavigate = (newUrl?: string) => {
    const targetUrl = newUrl || inputValue.trim();
    let finalUrl = targetUrl;
    
    // Add https:// if no protocol specified
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      // Check if it looks like a URL (has dots) or a search query
      if (finalUrl.includes(".") && !finalUrl.includes(" ")) {
        finalUrl = "https://" + finalUrl;
      } else {
        // Treat as Google search
        finalUrl = `https://www.google.com/search?q=${encodeURIComponent(finalUrl)}`;
      }
    }
    
    setUrl(finalUrl);
    setInputValue(finalUrl);
  };

  const handleBack = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.history.back();
    }
  };

  const handleForward = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.history.forward();
    }
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = url;
    }
  };

  const handleHome = () => {
    handleNavigate("https://www.google.com");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNavigate();
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Browser Controls */}
      <div className="h-12 px-3 flex items-center gap-2 border-b border-border/50 bg-secondary/50">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={handleBack}
          disabled={!canGoBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={handleForward}
          disabled={!canGoForward}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={handleRefresh}
        >
          <RotateCw className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={handleHome}
        >
          <Home className="h-4 w-4" />
        </Button>

        {/* URL Bar */}
        <div className="flex-1 flex items-center gap-2 bg-secondary rounded-lg px-3 h-8">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Suche oder gib eine URL ein"
            className="flex-1 border-0 bg-transparent p-0 h-6 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
          />
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 relative">
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-full border-0"
          title="Browser"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        />
      </div>
    </div>
  );
};
