import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Text "mo:base/Text";
import Types "./types";

module {
  type Guild = Types.Guild;
  type GuildId = Types.GuildId;

  public class Directory() {
    let hashMap = HashMap.HashMap<GuildId, Guild>(12, Text.equal, Text.hash);

    public func createOne(guildId: GuildId, guild: Guild) {
      hashMap.put(guildId, guild);
    };

    public func updateOne(guildId: GuildId, guild: Guild) {
      hashMap.put(guildId, guild);
    };

    public func findOne(guildId: GuildId): ?Guild {
      hashMap.get(guildId);
    };

    public func findAll(): [Guild] {
      Iter.toArray<Guild>(hashMap.vals());
    };
  };
};