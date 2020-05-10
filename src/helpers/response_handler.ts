interface IInfo {
  response: any,
  statusCode: number,
  data: any,
  message: string,
};

export const responseHandler = (info: IInfo) => {
  const { response, statusCode, data, message } = info;

  return response.status(statusCode).json({
    message,
    data
  });
}
