import { v4 } from 'uuid';

/**
 * User class
 *
 * @category Resources / User
 */
export class User {
  id: string;

  name: string;

  login: string;

  password: string;

  /**
   * Create a user
   *
   * @param {string} id - user id
   * @param {string} name - user name
   * @param {string} login - user login
   * @param {string} password  - user password
   */
  constructor({
                id = v4(),
                name = 'USER',
                login = 'user',
                password = 'P@55w0rd'
              }: {
    id?: string,
    name?: string,
    login?: string,
    password?: string
  }) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Return user data for response
   *
   * @param {User} user
   * @returns {{name: User.name, id: User.id, login: User.login}}
   */
  static toResponse(user: User): Partial<User> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
