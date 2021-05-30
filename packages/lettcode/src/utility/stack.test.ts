import { calPoints } from '../stack'
describe('stack', () => {
  it('棒球比赛', () => {
    expect(calPoints(["5", "2", "C", "D", "+"])).toBe(30);
  });
  
})