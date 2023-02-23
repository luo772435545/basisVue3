/**
 * 防抖 吟唱
 * @param fn Function 执行函数
 * @param time Number 时间
 * @param immediate Boolean 是否立即执行
 * */
export const debounce = (fn: Function, time = 1000, immediate = false): Function => {
  let timer: NodeJS.Timeout;
  return function () {
    let args = arguments;
    // @ts-ignore
    let _this = this;
    if (timer) clearTimeout(timer);
    if (immediate) {
      if (!timer) fn.apply(_this, args);
      timer = setTimeout(() => {
        fn.apply(_this, args);
      }, time);
    } else {
      timer = setTimeout(() => {
        fn.apply(_this, args);
      }, time);
    }
  };
};

/**
 * 节流 冷却
 * @param fn Function 执行函数
 * @param time Number 冷却时间
 * */
export const throttle = (fn: Function, time: number) => {
  let start: number | null = null;
  return function () {
    let newTime = Date.now();
    // @ts-ignore
    let _this = this;
    if (!start || newTime - start >= time) {
      start = new Date().getTime();
      fn.apply(_this, arguments);
    }
  };
};

export const typeOf = (obj: any): string => {
  let map:any = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
  };
  return map[Reflect.toString.call(obj)];
};
