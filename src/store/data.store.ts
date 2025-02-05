import { create } from "zustand";

interface Position {
  _id: string;
  lat: number;
  lng: number;
}

interface User {
  name: string;
  lastName: string;
}

interface ClientData {
  title: string;
  _id: string;
}

interface Incident {
  _id: string;
  status: string;
  item: string;
  description: string;
  owner: string;
  tag: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  limitDate: string;
  createdAt: string;
  updatedAt: string;
}

interface Project {
  _id: string;
  title: string;
  projectPlan: {
    _id: string;
  };
  status: string;
  img: string;
  lastVisit: string;
  position: Position;
  users: User[];
  clientData: ClientData;
  city: string;
  lastUpdated: string;
  partnerClients: any[];
  companyId: string;
  address: string;
  projectClientAdmin: string[];
  projectPlanData: {
    plan: string;
  };
  createdAt: string;
  incidents: Incident[];
}

interface DataStore {
  projects: Project[] | null;
  setProject: (projects: Project[]) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  projects: null,
  setProject: (projects) => set({ projects }),
}));
