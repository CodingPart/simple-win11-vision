import { useState } from "react";
import { Search, Wifi, Volume2, Battery } from "lucide-react";
import { AppDefinition } from "@/types/window";
import { StartMenu } from "./StartMenu";

interface TaskbarProps {
  apps: AppDefinition[];
  onAppClick: (app: AppDefinition) => void;
  openWindows: any[];
  onWindowClick: (windowId: string) => void;
}

export const Taskbar = ({ apps, onAppClick, openWindows, onWindowClick }: TaskbarProps) => {
  const [showStartMenu, setShowStartMenu] = useState(false);

  return (
    <>
      {showStartMenu && (
        <StartMenu apps={apps} onAppClick={onAppClick} onClose={() => setShowStartMenu(false)} />
      )}
      
      <div className="fixed bottom-0 left-0 right-0 h-12 taskbar-glass border-t border-white/10 flex items-center justify-center z-50">
        <div className="flex items-center gap-1 px-2">
          {/* Start Button */}
          <button
            onClick={() => setShowStartMenu(!showStartMenu)}
            className="h-10 w-12 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
          >
            <svg
              className="w-6 h-6 text-primary"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="3" y="3" width="8" height="8" rx="1" />
              <rect x="13" y="3" width="8" height="8" rx="1" />
              <rect x="3" y="13" width="8" height="8" rx="1" />
              <rect x="13" y="13" width="8" height="8" rx="1" />
            </svg>
          </button>

          {/* Search */}
          <button className="h-10 w-12 flex items-center justify-center rounded hover:bg-white/10 transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-white/20 mx-1" />

          {/* App Icons */}
          {apps.slice(0, 3).map((app) => {
            const isOpen = openWindows.some((w) => w.id === app.id);
            return (
              <button
                key={app.id}
                onClick={() => {
                  if (isOpen) {
                    const window = openWindows.find((w) => w.id === app.id);
                    if (window) onWindowClick(window.id);
                  } else {
                    onAppClick(app);
                  }
                }}
                className={`h-10 w-12 flex items-center justify-center rounded hover:bg-white/10 transition-colors relative ${
                  isOpen ? "bg-white/5" : ""
                }`}
              >
                <app.icon className="w-5 h-5 text-primary" />
                {isOpen && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>

        {/* System Tray */}
        <div className="absolute right-2 flex items-center gap-1">
          <button className="h-8 px-2 flex items-center gap-2 rounded hover:bg-white/10 transition-colors">
            <Wifi className="w-4 h-4" />
            <Volume2 className="w-4 h-4" />
            <Battery className="w-4 h-4" />
          </button>
          <button className="h-8 px-3 flex items-center rounded hover:bg-white/10 transition-colors">
            <span className="text-xs">
              {new Date().toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
