export class Reference {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;

  constructor(title: string) {
    this.title = title;
  }
}
