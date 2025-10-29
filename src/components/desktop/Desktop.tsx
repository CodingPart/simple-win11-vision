import { useState } from "react";
import { Chrome, Folder, FileText, Image, Music } from "lucide-react";
import { Window } from "@/components/windows/Window";
import { Taskbar } from "./Taskbar";
import { WindowState, AppDefinition } from "@/types/window";
import { Browser } from "@/components/windows/Browser";
import { FileExplorer } from "@/components/windows/FileExplorer";
import windowsBg from "@/assets/windows-bg.jpg";

const APPS: AppDefinition[] = [
  { id: "browser", name: "Browser", icon: Chrome, component: Browser },
  { id: "explorer", name: "Datei-Explorer", icon: Folder, component: FileExplorer },
  { id: "notepad", name: "Editor", icon: FileText, component: () => <div className="p-4">Texteditor</div> },
  { id: "photos", name: "Fotos", icon: Image, component: () => <div className="p-4">Fotogalerie</div> },
  { id: "music", name: "Musik", icon: Music, component: () => <div className="p-4">Musikplayer</div> },
];

export const Desktop = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [highestZIndex, setHighestZIndex] = useState(1000);

  const openApp = (app: AppDefinition) => {
    const existingWindow = windows.find((w) => w.id === app.id);
    
    if (existingWindow) {
      // Bring to front and restore if minimized
      setWindows((prev) =>
        prev.map((w) =>
          w.id === app.id
            ? { ...w, isMinimized: false, zIndex: highestZIndex + 1 }
            : w
        )
      );
      setHighestZIndex((prev) => prev + 1);
    } else {
      // Create new window
      const newWindow: WindowState = {
        id: app.id,
        title: app.name,
        icon: app.icon,
        component: app.component,
        isMinimized: false,
        isMaximized: false,
        position: { x: 100 + windows.length * 30, y: 50 + windows.length * 30 },
        size: { width: 1000, height: 700 },
        zIndex: highestZIndex + 1,
      };
      setWindows((prev) => [...prev, newWindow]);
      setHighestZIndex((prev) => prev + 1);
    }
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  };

  const maximizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  };

  const focusWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: highestZIndex + 1 } : w))
    );
    setHighestZIndex((prev) => prev + 1);
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position } : w))
    );
  };

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, size } : w))
    );
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative"
      style={{
        backgroundImage: `url(${windowsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 space-y-4">
        {APPS.slice(0, 3).map((app) => (
          <button
            key={app.id}
            onDoubleClick={() => openApp(app)}
            className="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/10 transition-colors w-24"
          >
            <app.icon className="w-10 h-10 text-white drop-shadow-lg" />
            <span className="text-xs text-white drop-shadow-lg text-center">{app.name}</span>
          </button>
        ))}
      </div>

      {/* Windows */}
      {windows.map((window) => (
        <Window
          key={window.id}
          window={window}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          onUpdatePosition={(pos) => updateWindowPosition(window.id, pos)}
          onUpdateSize={(size) => updateWindowSize(window.id, size)}
        />
      ))}

      {/* Taskbar */}
      <Taskbar
        apps={APPS}
        onAppClick={openApp}
        openWindows={windows}
        onWindowClick={focusWindow}
      />
    </div>
  );
};
