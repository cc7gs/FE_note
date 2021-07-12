import { queen,createChessboard } from "../../basic/queen";


describe('queen', () => {
  it('getChessboard:4',()=>{
    const chessboard = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    expect(createChessboard(4)).toEqual(chessboard);
  })
  it('queen:4', () => {
    expect(queen(4)).toEqual([[1,7,8,14],[2,4,11,13]]);
  })
})