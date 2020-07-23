/**
 * @author 🌈MARS <wangdaoo@yeah.net>
 * @desc 📝深拷贝 - 好像不够深啊
 * @copyright 🤝这个世界，一些人赢在了不像别人，一些人输在了不像自己。
 */
export function deepClone(sourceObj, targetObj) {
  let cloneObj = targetObj || {}
  if (!sourceObj || typeof sourceObj !== 'object' || sourceObj.length === undefined) return sourceObj
  if (sourceObj instanceof Array) {
    cloneObj = sourceObj.concat()
  } else {
    for (let i in sourceObj) {
      if (typeof sourceObj[i] === 'object') {
        cloneObj[i] = deepClone(sourceObj[i], {})
      } else {
        cloneObj[i] = sourceObj[i]
      }
    }
  }
  return cloneObj
}
