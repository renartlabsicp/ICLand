import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Text "mo:base/Text";
import Types "./types";


module {
  type User = Types.User;
  type UserId = Types.UserId;

  public class Directory() {
    let hashMap = HashMap.HashMap<UserId, User>(12, Text.equal, Text.hash);

    public func createOne(userId: UserId, user: User) {
      hashMap.put(userId, user);
    };

    public func updateOne(userId: UserId, user: User) {
      hashMap.put(userId, user);
    };

    public func findOne(userId: UserId): ?User {
      hashMap.get(userId);
    };

    public func findAll(): [User] {
      Iter.toArray<User>(hashMap.vals());
    };
  };
};