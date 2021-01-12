import User from '../models/User';

export default class UserMap {
  public static toDTO(user: User): any {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
