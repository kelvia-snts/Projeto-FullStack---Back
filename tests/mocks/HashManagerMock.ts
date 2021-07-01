export class HashManagerMock {
  public async hash(text: string): Promise<string> {
    return text;
  }

  public async compare(text: string, hash: string): Promise<boolean> {
    return text === hash;
  }
}
