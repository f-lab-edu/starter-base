import { UserRole } from '@prisma/client'

export class User {
  constructor(
    private readonly id: number,
    private readonly username: string,
    private readonly email: string,
    private readonly password: string,
    private readonly role: UserRole,
  ) {}

  /**
   * 비밀번호 암호화
   *
   * @param password 암호화할 비밀번호
   * @returns 암호화된 비밀번호
   */
  static encryptPassword(password: string): string {
    return password
  }

  /**
   * 두 비밀번호가 일치하는지 여부 확인
   *
   * @param password 암호화 전 비밀번호
   * @returns 비밀번호 일치 여부
   */
  checkIsMatchPassword(password: string): boolean {
    return true
  }
}
