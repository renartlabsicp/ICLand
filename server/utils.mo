import Array "mo:base/Array";
import Option "mo:base/Option";
import GuildDatabase "./guildDatabase";
import UserDatabase "./userDatabase";
import Types "./types";

module {
  type Guild = Types.Guild;
  type GuildId = Types.GuildId;
  type User = Types.User;
  type UserId = Types.UserId;

  public func getGuild(directory: GuildDatabase.Directory, guildId: GuildId): Guild {
    let existing = directory.findOne(guildId);
    switch (existing) {
      case (?existing) { existing };
      case (null) {
        {
          id = guildId;
          isActive = false;
          name = "";
          nftCanisterId = "";
          nftStandard = "";
          owner = "";
          website = "";
        }
      };
    };
  };

  public func getUser(directory: UserDatabase.Directory, userId: UserId): User {
    let existing = directory.findOne(userId);
    switch (existing) {
      case (?existing) { existing };
      case (null) {
        {
          id = userId;
          isActive = false;
          discordId = "";
        }
      };
    };
  };
};