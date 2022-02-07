import formatMoney from '../lib/formatMoney';

describe('formatMoney', () => {
  it('works with fractional GBP', () => {
    expect(formatMoney(1)).toEqual('£0.01');
    expect(formatMoney(10)).toEqual('£0.10');
    expect(formatMoney(9)).toEqual('£0.09');
  });

  it('omits pennies when it is a whole pound', () => {
    expect(formatMoney(100)).toEqual('£1');
    expect(formatMoney(1000)).toEqual('£10');
    expect(formatMoney(500000)).toEqual('£5,000');
  });

  it('works with whole and fractional pounds', () => {
    expect(formatMoney(140)).toEqual('£1.40');
    expect(formatMoney(2040)).toEqual('£20.40');
    expect(formatMoney(5009)).toEqual('£50.09');
  });
});
