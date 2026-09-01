export interface MicroTask {
  id: string;
  title: string;
  durationMinutes: number;
  completed: boolean;
  parentTaskId?: string;
}

export interface Task {
  id: string;
  title: string;
  createdAt: string;
  microTasks: MicroTask[];
  completed: boolean;
}

export interface IkigaiState {
  goalTitle: string;
  reasoning: string;
  updatedAt?: string;
}

export interface OsojiCheckItem {
  id: string;
  text: string;
  detail: string;
  checked: boolean;
}

export interface FocusSession {
  id: string;
  taskId: string;
  taskTitle: string;
  durationSeconds: number;
  reflectionNote?: string;
  aiFeedback?: string;
  completedAt: string;
}

export type AppFlowStage = 'DASHBOARD' | 'OSOJI_PREP' | 'FOCUS_ROOM' | 'POST_REFLECTION';
