export interface Task {
  id: number;
  title: string;
  status: string;
  flagged: boolean;
  tags: string[];
  note: string;
}
