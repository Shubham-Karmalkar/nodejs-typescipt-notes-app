export type Providers = "Google" | "EmailPassword";
export interface IUser {
  _id: string;
  type: string;
  name: string;
  email: string;
  imageUrl: string;
  createAt: number;
  updatedAt: number;
  providerId: Providers;
  phoneNumber: number;
}

export type BaseUser = IUser & {
  type: "base";
};

export type ProUser = IUser & {
  type: "pro";
};

export type AdminUser = IUser & {
  type: "admin";
};

export type User = BaseUser | ProUser | AdminUser;
