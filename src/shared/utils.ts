import { v4 as uuidv4 } from 'uuid'

export const debounce = (fn: Function, delay: number) => {
  let timer: number| undefined = undefined
  
  return function(this: unknown, ...args: any[]) {
  
    const context = this 
    if (timer) {
      window.clearTimeout(timer)
    }
    timer = window.setTimeout(() => {
      fn.apply(context, args)
      window.clearTimeout(timer)
      timer = undefined
    }, delay)
  }
}

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