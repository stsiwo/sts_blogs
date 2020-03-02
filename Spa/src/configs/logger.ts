export declare type LogType = (message: any) => void;

export const logger: (filename: string) => LogType = (filename) => {
  return (message) => {
    if (NODE_ENV !== 'production') {

      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + ' ' + time;

      console.log(`[${dateTime}] at ${filename}: ${JSON.stringify(message, getCircularReplacer(), 4)}`);
    }
  }
}

/**
 * to prevent circular dependency from loop forever
 **/
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: any, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
