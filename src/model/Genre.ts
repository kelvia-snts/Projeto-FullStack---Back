export class Genre {
  constructor(private id: string, private name: string) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public static toGenreModel(genre: any): Genre | undefined {
    return new Genre(genre.id, genre.name);
  }
}

export interface GenreDTO {
  name: string;
}
