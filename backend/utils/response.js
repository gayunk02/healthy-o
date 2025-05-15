// utils/response.js
export const success = (res, message, data = {}) => {
    return res.status(200).json({
      success: true,
      message,
      data
    });
  };
  
  export const error = (res, statusCode = 500, message = '서버 오류') => {
    return res.status(statusCode).json({
      success: false,
      message
    });
  };
  