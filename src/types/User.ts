export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
};

export type UserInput = {
  name: string;
  email: string;
  password: string;
  role: string;
};
