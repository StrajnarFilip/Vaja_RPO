import { NumberRoundingPipe } from './number-rounding.pipe';

describe('NumberRoundingPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberRoundingPipe();
    expect(pipe).toBeTruthy();
  });
});
