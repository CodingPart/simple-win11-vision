export interface WindowState {
  id: string;
  title: string;
  icon: any;
  component: React.ComponentType<any>;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface AppDefinition {
  id: string;
  name: string;
  icon: any;
  component: React.ComponentType<any>;
}
