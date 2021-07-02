export class Friendship {
  constructor(private follower: string, private followed: string) {}

  public getFollower(): string {
    return this.follower;
  }

  public getFollowed(): string {
    return this.followed;
  }

  static toFollowModel(friendship: any): Friendship {
    return new Friendship(friendship.follower, friendship.followed);
  }
}

export interface FriendshipDTO {
  followed: string;
}
