import { TimeFromNowPipe } from "./time-from-now.pipe";

describe('TimeFromNowPipe', () => {
  let timeFromNowPipe: TimeFromNowPipe;
  const referenceTimestamp: number = new Date(1985, 9, 26, 9, 0).getTime();
  let timestampSpy: any;

  beforeEach(() => {
    timeFromNowPipe = new TimeFromNowPipe();
    timestampSpy = spyOn(Date, 'now').and.returnValue(referenceTimestamp);
  })

  it('should return how long ago past date occured', () => {
    const pastTimestamp: number = new Date(1955, 10, 12, 6, 38).getTime();
    expect(timeFromNowPipe.transform(pastTimestamp)).toEqual('30 years ago');
  })

  it('should return how long until future date will occur', () => {
    const futureTimestamp: number = new Date(2015, 9, 21, 7, 28).getTime();
    expect(timeFromNowPipe.transform(futureTimestamp)).toEqual('in 30 years');
    
    const futureTimestamp2: number = new Date(1985, 9, 26, 9, 1).getTime();
    expect(timeFromNowPipe.transform(futureTimestamp2)).toEqual('in 1 minute');

    const futureTimestamp3: number = new Date(1985, 11, 26, 9, 1).getTime();
    expect(timeFromNowPipe.transform(futureTimestamp3)).toEqual('in 2 months');
  })

  it('should return the input string if it\'s not a valid timestamp', () => {
    expect(timeFromNowPipe.transform(null)).toEqual('null');

  });
});
