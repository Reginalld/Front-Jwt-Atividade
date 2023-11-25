import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    const user = new User();
    expect(user).toBeTruthy();
  });

  it('should have properties set correctly', () => {
    const user = new User();
    user.id = 1;
    user.username = 'john_doe';
    user.role = 'user';
    user.token = 'abc123';

    expect(user.id).toEqual(1);
    expect(user.username).toEqual('john_doe');
    expect(user.role).toEqual('user');
    expect(user.token).toEqual('abc123');
  });

});