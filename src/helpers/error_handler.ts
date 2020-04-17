export const errorHandler = (functionToRun: Function) => {
  try {
    return functionToRun();
  } catch(err) {
    return err;
  }
}
