export interface User {
  id: number;
  email: string;
  password: string;
}

export type UserPayload = {
  id: number;
  email: string;
};

export type TGender = 'male' | 'female' | 'other' | '';

export interface TUserInput {
  name: string;
  email: string;
  password: string;
  gender: TGender;
}

export type TLoginForm = Omit<TUserInput, 'name' | 'gender'>;
