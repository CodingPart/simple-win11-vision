import { Folder, File, HardDrive, Image, Music, Video } from "lucide-react";

const folders = [
  { name: "Dokumente", icon: Folder },
  { name: "Downloads", icon: Folder },
  { name: "Bilder", icon: Image },
  { name: "Musik", icon: Music },
  { name: "Videos", icon: Video },
];

const files = [
  { name: "README.txt", icon: File },
  { name: "notes.txt", icon: File },
];

export const FileExplorer = () => {
  return (
    <div className="h-full flex bg-background">
      {/* Sidebar */}
      <div className="w-48 border-r border-border/50 p-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 px-3 py-2 rounded hover:bg-secondary/50 cursor-pointer">
            <HardDrive className="w-4 h-4 text-primary" />
            <span className="text-sm">Dieser PC</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded hover:bg-secondary/50 cursor-pointer">
            <Folder className="w-4 h-4 text-accent" />
            <span className="text-sm">Desktop</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded hover:bg-secondary/50 cursor-pointer">
            <Folder className="w-4 h-4 text-accent" />
            <span className="text-sm">Dokumente</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-4 gap-4">
          {folders.map((folder) => (
            <div
              key={folder.name}
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
            >
              <folder.icon className="w-12 h-12 text-accent" />
              <span className="text-sm text-center">{folder.name}</span>
            </div>
          ))}
          {files.map((file) => (
            <div
              key={file.name}
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
            >
              <file.icon className="w-12 h-12 text-muted-foreground" />
              <span className="text-sm text-center">{file.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
