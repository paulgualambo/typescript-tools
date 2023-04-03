import { UCRegister } from '../src/useCase/UCRegister';
describe('test', () => {
  test('add', async () => {
    expect(1 + 1).toEqual(2);
  });
});

describe('test1', () => {
  test('minus', async () => {
    expect(1 - 1).toEqual(0);
  });
});

describe('UC', () => {
  test('execute', async () => {
    const uc = new UCRegister();
    expect(uc.execute(2, 3)).toEqual(5);
  });
});
