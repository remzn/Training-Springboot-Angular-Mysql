export interface User {
  id: number;
  name: string;
  email: string;
  surname: string;
  registerDate?: Date; // Kayıt tarihi (opsiyonel)
}
