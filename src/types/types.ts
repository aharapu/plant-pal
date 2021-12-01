export type Credentials = { email: string; password: string };

export type Plant = {
  name: string;
  wateringInterval: number;
};

export type UserData = {
  email?: string;
  plants: Plant[];
};
