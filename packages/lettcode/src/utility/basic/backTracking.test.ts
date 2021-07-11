import { mazeTrack } from "../../basic/backTracking"

describe('backTracking', () => {
  it('basic', () => {
    const maze = [
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 0],
      [0, 0, 0, 1, 0, 1],
      [1, 1, 0, 0, 0, 1],
      [0, 0, 0, 1, 1, 1],
      [2, 1, 0, 0, 0, 0],
    ]
    const finalPath = [
      [0, 0],
      [1, 0],
      [2, 0], [2, 1], [2, 2],
      [3, 2], [4, 2], [4, 1],
      [4, 0],
      [5, 0]
    ]
    expect(mazeTrack(maze)).toEqual(finalPath)
  })
})