export interface User {
  id: string;
  isActive: boolean;
  discordId: number;
  discriminator?: string;
  username?: string;
}
