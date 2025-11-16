type ResponseData = any;

class ResponseBase {
  success: boolean;
  message: string;
  data: ResponseData | null;
  error: string | null;

  constructor(
    success: boolean,
    message: string,
    data: ResponseData | null = null,
    error: string | null = null
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  static success(data: ResponseData, message: string = "Success") {
    return new ResponseBase(true, message, data, null);
  }

  static fail(message: string = "Error", error: string | null = null) {
    return new ResponseBase(false, message, null, error);
  }
}

module.exports = ResponseBase;
