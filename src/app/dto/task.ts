export class Task {
  id: number;
  text: string;
  active: boolean;
  flagged: boolean;
  createdAt: string;
  updatedAt: string;

  constructor(text: string) {
    this.text = text;
  }
}
