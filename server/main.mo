import GuildDatabase "./guildDatabase";
import UserDatabase "./userDatabase";
import Types "./types";
import Utils "./utils";

actor API {
  var guildDirectory: GuildDatabase.Directory = GuildDatabase.Directory();
  var userDirectory: UserDatabase.Directory = UserDatabase.Directory();

  type Guild = Types.Guild;
  type GuildId = Types.GuildId;
  type User = Types.User;
  type UserId = Types.UserId;

  // Healthcheck

  public func healthcheck(): async Bool { true };

  // Guilds

  public shared func createGuild(guildId: GuildId, guild: Guild): async () {
    guildDirectory.createOne(guildId, guild);
  };

  public shared func updateGuild(guild: Guild): async () {
    guildDirectory.updateOne(guild.id, guild);
  };

  public query func getGuild(guildId: GuildId): async Guild {
    Utils.getGuild(guildDirectory, guildId)
  };

  public query func getAllGuilds(): async [Guild] {
    guildDirectory.findAll()
  };

  // User

  public shared func createUser(userId: UserId, user: User): async () {
    userDirectory.createOne(userId, user);
  };

  public shared func updateUser(user: User): async () {
    userDirectory.updateOne(user.id, user);
  };

  public query func getUser(userId: UserId): async User {
    Utils.getUser(userDirectory, userId)
  };

  public query func getAllUsers(): async [User] {
    userDirectory.findAll()
  };
};