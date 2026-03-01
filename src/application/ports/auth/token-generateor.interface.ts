export interface ITokenGenerator {
  generateToken(payload: any): string;
}
