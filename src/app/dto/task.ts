export class Task {
  id: number;
  title: string;
  description: string;
  active: boolean;
  flagged: boolean;
  createdAt: string;
  updatedAt: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}
