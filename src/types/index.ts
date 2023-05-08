export type ResourceData = {
  id: string;
  title: string;
  description: string;
  link: string;
  priority: number;
  timeToFinish: number;
  status: string;
  createdAt: string;
};

export type ResourceDataUpdate = {
  title: string;
  description: string;
  link: string;
  priority: number;
  timeToFinish: number;
  status: string;
  createdAt: string;
};

export type ResourceDataCreate = {
  title: string;
  description: string;
  link: string;
  priority: number;
  timeToFinish: number;
};
