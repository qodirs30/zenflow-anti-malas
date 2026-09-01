"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Task, MicroTask, IkigaiState, OsojiCheckItem, FocusSession, AppFlowStage } from "@/types";

const INITIAL_OSOJI_CHECKLIST: OsojiCheckItem[] = [
  { id: "1", text: "Bersihkan Meja Kerja (Osoji)", detail: "Singkirkan benda yang tidak dibutuhkan dari pandangan mata", checked: false },
  { id: "2", text: "Tutup Tab & Notifikasi HP", detail: "Matikan pemberitahuan yang berpotensi memecah fokus", checked: false },
  { id: "3", text: "Siapkan Air Minum", detail: "Pastikan hidrasi tercukupi selama 25 menit kedepan", checked: false },
  { id: "4", text: "Tentukan 1 Tugas Spesifik (Ichigo Ichie)", detail: "Niatkan seluruh perhatian hanya pada tugas ini", checked: false },
];

const DEFAULT_IKIGAI: IkigaiState = {
  goalTitle: "Membangun Karya Bermakna & Mencapai Ketenangan Pikiran",
  reasoning: "Setiap langkah kecil yang fokus adalah bentuk rasa hormat pada waktu dan potensi diri.",
};

const DEFAULT_TASKS: Task[] = [
  {
    id: "demo-task-1",
    title: "Menulis Draf Artikel Pertamaku",
    createdAt: new Date().toISOString(),
    completed: false,
    microTasks: [
      { id: "m1", title: "Buka dokumen & tuliskan 3 judul utama (2 min)", durationMinutes: 2, completed: true },
      { id: "m2", title: "Tuliskan poin outline paragraf pembuka (3 min)", durationMinutes: 3, completed: false },
      { id: "m3", title: "Kumpulkan 2 referensi kunci (4 min)", durationMinutes: 4, completed: false },
    ],
  },
];

interface AppStateContextType {
  ikigai: IkigaiState;
  setIkigai: (ikigai: IkigaiState) => void;
  tasks: Task[];
  activeMicroTask: MicroTask | null;
  activeParentTask: Task | null;
  flowStage: AppFlowStage;
  osojiChecklist: OsojiCheckItem[];
  focusSessions: FocusSession[];
  lastAiFeedback: string | null;
  
  // Actions
  addTask: (title: string, microTasks?: Array<{ title: string; durationMinutes: number }>) => Task;
  toggleMicroTask: (taskId: string, microId: string) => void;
  deleteTask: (taskId: string) => void;
  selectTaskForFocus: (task: Task, microTask?: MicroTask) => void;
  toggleOsojiItem: (id: string) => void;
  completeOsojiAndStartFocus: () => void;
  finishFocusRoomSession: () => void;
  submitReflectionAndFinish: (reflectionText: string) => Promise<string>;
  cancelFlowBackToDashboard: () => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ikigai, setIkigaiState] = useState<IkigaiState>(DEFAULT_IKIGAI);
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [activeMicroTask, setActiveMicroTask] = useState<MicroTask | null>(null);
  const [activeParentTask, setActiveParentTask] = useState<Task | null>(null);
  const [flowStage, setFlowStage] = useState<AppFlowStage>('DASHBOARD');
  const [osojiChecklist, setOsojiChecklist] = useState<OsojiCheckItem[]>(INITIAL_OSOJI_CHECKLIST);
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>([]);
  const [lastAiFeedback, setLastAiFeedback] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedIkigai = localStorage.getItem("zenflow_ikigai");
      if (savedIkigai) setIkigaiState(JSON.parse(savedIkigai));

      const savedTasks = localStorage.getItem("zenflow_tasks");
      if (savedTasks) setTasks(JSON.parse(savedTasks));

      const savedSessions = localStorage.getItem("zenflow_sessions");
      if (savedSessions) setFocusSessions(JSON.parse(savedSessions));
    } catch (err) {
      console.error("Failed to load ZenFlow local state:", err);
    }
  }, []);

  // Save changes
  const setIkigai = (newIkigai: IkigaiState) => {
    setIkigaiState(newIkigai);
    localStorage.setItem("zenflow_ikigai", JSON.stringify(newIkigai));
  };

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem("zenflow_tasks", JSON.stringify(newTasks));
  };

  const addTask = (title: string, microTasksList?: Array<{ title: string; durationMinutes: number }>) => {
    const newTask: Task = {
      id: "task-" + Date.now(),
      title,
      createdAt: new Date().toISOString(),
      completed: false,
      microTasks: microTasksList
        ? microTasksList.map((m, idx) => ({
            id: `m-${Date.now()}-${idx}`,
            title: m.title,
            durationMinutes: m.durationMinutes,
            completed: false,
          }))
        : [
            {
              id: `m-${Date.now()}-default`,
              title: `Langkah pertama: Siapkan draf ${title}`,
              durationMinutes: 3,
              completed: false,
            },
          ],
    };

    const updated = [newTask, ...tasks];
    saveTasks(updated);
    return newTask;
  };

  const toggleMicroTask = (taskId: string, microId: string) => {
    const updated = tasks.map((task) => {
      if (task.id !== taskId) return task;
      const updatedMicros = task.microTasks.map((m) =>
        m.id === microId ? { ...m, completed: !m.completed } : m
      );
      const allCompleted = updatedMicros.every((m) => m.completed);
      return { ...task, microTasks: updatedMicros, completed: allCompleted };
    });
    saveTasks(updated);
  };

  const deleteTask = (taskId: string) => {
    const updated = tasks.filter((t) => t.id !== taskId);
    saveTasks(updated);
  };

  const selectTaskForFocus = (task: Task, microTask?: MicroTask) => {
    setActiveParentTask(task);
    setActiveMicroTask(microTask || task.microTasks.find((m) => !m.completed) || task.microTasks[0]);
    // Reset Osoji checklist for fresh prep
    setOsojiChecklist(INITIAL_OSOJI_CHECKLIST.map((item) => ({ ...item, checked: false })));
    setFlowStage('OSOJI_PREP');
  };

  const toggleOsojiItem = (id: string) => {
    setOsojiChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const completeOsojiAndStartFocus = () => {
    setFlowStage('FOCUS_ROOM');
  };

  const finishFocusRoomSession = () => {
    setFlowStage('POST_REFLECTION');
  };

  const submitReflectionAndFinish = async (reflectionText: string): Promise<string> => {
    const taskTitle = activeMicroTask?.title || activeParentTask?.title || "Tugas Fokus";

    let aiFeedback = "";
    try {
      const res = await fetch("/api/ai/reflect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reflection: reflectionText,
          ikigai: ikigai.goalTitle,
          taskTitle,
        }),
      });
      const data = await res.json();
      aiFeedback = data.feedback || "Setiap langkah kecil adalah bagian dari perjalanan panjangmu.";
    } catch {
      aiFeedback = "Langkah kecil yang kamu selesaikan hari ini membuktikan komitmenmu pada Ikigai.";
    }

    setLastAiFeedback(aiFeedback);

    // Save Session
    const newSession: FocusSession = {
      id: "session-" + Date.now(),
      taskId: activeParentTask?.id || "standalone",
      taskTitle,
      durationSeconds: 1500, // 25 mins
      reflectionNote: reflectionText,
      aiFeedback,
      completedAt: new Date().toISOString(),
    };

    const updatedSessions = [newSession, ...focusSessions];
    setFocusSessions(updatedSessions);
    localStorage.setItem("zenflow_sessions", JSON.stringify(updatedSessions));

    // Mark current active microtask as completed if applicable
    if (activeParentTask && activeMicroTask) {
      toggleMicroTask(activeParentTask.id, activeMicroTask.id);
    }

    return aiFeedback;
  };

  const cancelFlowBackToDashboard = () => {
    setFlowStage('DASHBOARD');
    setActiveMicroTask(null);
    setActiveParentTask(null);
  };

  return (
    <AppStateContext.Provider
      value={{
        ikigai,
        setIkigai,
        tasks,
        activeMicroTask,
        activeParentTask,
        flowStage,
        osojiChecklist,
        focusSessions,
        lastAiFeedback,
        addTask,
        toggleMicroTask,
        deleteTask,
        selectTaskForFocus,
        toggleOsojiItem,
        completeOsojiAndStartFocus,
        finishFocusRoomSession,
        submitReflectionAndFinish,
        cancelFlowBackToDashboard,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};
