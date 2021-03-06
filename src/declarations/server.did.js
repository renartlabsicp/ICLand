export const idlFactory = ({ IDL }) => {
  const GuildId__1 = IDL.Text;
  const GuildId = IDL.Text;
  const Guild = IDL.Record({
    'id' : GuildId,
    'owner' : IDL.Text,
    'name' : IDL.Text,
    'nftStandard' : IDL.Text,
    'isActive' : IDL.Bool,
    'website' : IDL.Text,
    'nftCanisterId' : IDL.Text,
  });
  const UserId__1 = IDL.Text;
  const UserId = IDL.Text;
  const User = IDL.Record({
    'id' : UserId,
    'discordId' : IDL.Text,
    'isActive' : IDL.Bool,
  });
  return IDL.Service({
    'createGuild' : IDL.Func([GuildId__1, Guild], [], []),
    'createUser' : IDL.Func([UserId__1, User], [], []),
    'getAllGuilds' : IDL.Func([], [IDL.Vec(Guild)], ['query']),
    'getAllUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'getGuild' : IDL.Func([GuildId__1], [Guild], ['query']),
    'getUser' : IDL.Func([UserId__1], [User], ['query']),
    'healthcheck' : IDL.Func([], [IDL.Bool], []),
    'updateGuild' : IDL.Func([Guild], [], []),
    'updateUser' : IDL.Func([User], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
