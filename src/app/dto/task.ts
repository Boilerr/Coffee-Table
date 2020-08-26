export class Task {
  id: number;
  title: string;
  description: string;
  tags: string[];
  flagged: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}
