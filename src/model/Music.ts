export class Music {
  constructor(
    private id: string,
    private title: string,
    private author: string,
    private date: Date,
    private file: string,
    private genreId: string[],
    private album: string
  ) {}

  public getId(): string {
    return this.id;
  }
  public getTitle(): string {
    return this.title;
  }
  public getAuthor(): string {
    return this.author;
  }
  public getDate(): Date {
    return this.date;
  }
  public getFile(): string {
    return this.file;
  }
  public getGenreId(): string[] {
    return this.genreId;
  }
  public getAlbum(): string {
    return this.album;
  }

  static toMusicModel(music: any): Music {
    return new Music(
      music.id,
      music.title,
      music.author,
      music.date,
      music.file,
      music.genre,
      music.album
    );
  }
}

export interface MusicCreation {
  title: string
  file: string;
  genreId: string[];
  album: string;
}
