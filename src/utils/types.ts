export type CreateUserParams = {
  username: string;
  password: string;
};

export type CreateUserContactParams = {
  alias: string;
  userId?: string;
};
