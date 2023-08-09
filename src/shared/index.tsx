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
