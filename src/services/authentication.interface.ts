export interface IAuthenticationService {
  hashPassword: (password: string) => Promise<string>
}