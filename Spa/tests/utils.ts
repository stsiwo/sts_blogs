/**
 * print body of the function
 **/
export const printBody = (func: (...args: any) => any) => {
  console.log(func.toString().slice(func.toString().indexOf("{") + 1, func.toString().lastIndexOf("}")))
}
