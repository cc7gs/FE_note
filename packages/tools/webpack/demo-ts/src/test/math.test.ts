const  {add,sub} =require('../math')

test('add 2+2',()=>{
    expect(add(2,2)).toBe(4)
})
test('sub 4-2',()=>{
    expect(sub(4,2)).toBe(2)
})