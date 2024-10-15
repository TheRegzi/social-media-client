import { logout } from './logout.js';
import { remove } from '../../storage/index.js';

jest.mock('../../storage/index.js', () => ({
  remove: jest.fn(),
}));

describe('logout', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('removes a token when logging out', () => {
    logout();
    expect(remove).toHaveBeenCalledWith('token');
    expect(remove).toHaveBeenCalledWith('profile');
  });
});
