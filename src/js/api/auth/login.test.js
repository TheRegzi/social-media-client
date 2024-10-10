import { login } from './login';
import { save } from '../../storage/save';

jest.mock('../../storage/save', () => ({
  save: jest.fn(),
}));

describe('login', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('stores a token when provided with valid credentials', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ accessToken: 'valid-token' }),
      }),
    );
    await login('test@example.com', 'password123');
    expect(save).toHaveBeenCalledWith('token', 'valid-token');
  });

  it('throws an error when provided with invalid credentials', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Unauthorized',
      }),
    );
    await expect(login('test@example.com', 'wrongpassword')).rejects.toThrow(
      'Unauthorized',
    );
    expect(save).not.toHaveBeenCalled();
  });
});
