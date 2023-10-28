import { StatusCodes } from "http-status-codes";

const errorMiddleware = (err, req, res, next) => {
  console.log(req);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "something went wrong";
  res.status(statusCode).json({ msg });
};

export default errorMiddleware;
