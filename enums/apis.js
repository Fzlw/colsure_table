module.exports = {
  getBaseResponse: () => {
    return {
      success: false,
      message: ''
    };
  },
  getSuccess: () => {
    return {
      success: true,
      message: 'success'
    };
  },
  getError: () => {
    return {
      success: false,
      message: '服务异常'
    };
  },
}