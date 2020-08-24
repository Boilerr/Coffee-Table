export class Project {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}

