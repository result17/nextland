import { v4 as uuidv4 } from 'uuid'


export const generateRandomStr = () => {
  let res = "";
  while (res.length < 8) {
    const pieces = uuidv4();
    for (const piece of pieces.slice(4)) {
      if (piece === "-") continue;
      res += piece;
      if (res.length >= 8) return res;
    }
  }
  return res;
};