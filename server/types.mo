import Principal "mo:base/Principal";

module {
  public type GuildId = Text;

  public type Guild = {
    id: GuildId;
    isActive: Bool;
    name: Text;
    nftCanisterId: Text;
    nftStandard: Text;
    owner: Text;
    website: Text;
  };

  public type UserId = Text;

  public type User = {
    id: UserId;
    isActive: Bool;
    discordId: Text;
  };
};
