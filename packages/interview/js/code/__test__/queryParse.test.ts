import queryParse from '../queryParse';

describe('query parse', () => {
  it('basic(a=b&b=c)', () => {
    expect(queryParse('a=1&b=2')).toEqual({ a: "1", b: "2" })
  })
  it('less val(b&c)', () => {
    expect(queryParse('a&b')).toEqual({})
  })
  it('parse object(obj[a]=1&obj[b]=2)', () => {
    expect(queryParse('name=cc&obj[a]=1&obj[b]=2')).toEqual({ name: 'cc', obj: { a: "1", b: "2" } })
  })
  it('parse dep object(obj[a][c]=1&obj[b]=2)', () => {
    expect(queryParse('name=cc&obj[a][c]=1&obj[b]=2')).toEqual({ name: 'cc', obj: { a: { c: "1" }, b: "2" } })
  })
  it('parse array', () => {
    expect(queryParse('name=cc&arr[0]=1&arr[1]=2')).toEqual({ name: 'cc', arr: ["1", "2"] })
  })
})