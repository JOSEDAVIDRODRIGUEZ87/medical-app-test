export enum UserRole {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  password?: string;
  createdAt?: Date;
}
