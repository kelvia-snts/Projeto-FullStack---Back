export class Album {
  constructor(
    private id: string,
    private user_id: string,
    private name: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public getUserId(): string {
    return this.user_id;
  }

  public getName(): string {
    return this.name;
  }

  public static toAlbumModel(album: any): Album | undefined {
    return new Album(album.id, album.user_id, album.name);
  }
}

export interface AlbumDTO {
  name: string;
}
