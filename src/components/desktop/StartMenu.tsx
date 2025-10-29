import { AppDefinition } from "@/types/window";
import { Power, Settings, User } from "lucide-react";

interface StartMenuProps {
  apps: AppDefinition[];
  onAppClick: (app: AppDefinition) => void;
  onClose: () => void;
}

export const StartMenu = ({ apps, onAppClick, onClose }: StartMenuProps) => {
  const handleAppClick = (app: AppDefinition) => {
    onAppClick(app);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Start Menu */}
      <div className="fixed bottom-14 left-1/2 transform -translate-x-1/2 w-[600px] h-[640px] taskbar-glass rounded-xl shadow-2xl border border-white/20 z-50 animate-slide-up">
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-1">Angeheftet</h2>
          </div>

          {/* Pinned Apps */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-6 gap-4">
              {apps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app)}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <app.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs text-center leading-tight">{app.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">Benutzer</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-10 h-10 rounded hover:bg-white/10 flex items-center justify-center transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded hover:bg-white/10 flex items-center justify-center transition-colors">
                <Power className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
