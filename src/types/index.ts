import { IconType } from "react-icons";

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  link: string;
  githubUrl: string;
  createdAt: {
    toDate: () => Date;
  };
}

export interface Service {
  id?: string;
  title: string;
  description: string;
  icon: IconType | string;
  price?: string;
}

export interface Quote {
  id: string;
  userEmail: string;
  projectType: string;
  description: string;
  budget: string;
  deadline: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  createdAt: {
    toDate: () => Date;
  };
}

export interface User {
  uid: string;
  email: string;
  isAdmin: boolean;
}
