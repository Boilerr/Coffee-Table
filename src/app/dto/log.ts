export class Log {
  id: number;
  source: string;
  category: string;
  description: string;
  createdAt: string;
  updatedAt: string;

  constructor(source: string, category: string, description: string) {
    this.source = source;
    this.category = category;
    this.description = description;
  }
}
