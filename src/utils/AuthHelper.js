class AuthHelper {
  static register(authData) {
    const { mobileNo = '', customerId = '' } = authData;
    this.mobileNumber = mobileNo;
    this.customerId = customerId;
  }

  static isLoggedIn() {
    if (this.mobileNumber || this.customerId) {
      return true;
    }
    return false;
  }

  static logout() {
    this.mobileNumber = '';
    this.customerId = '';
  }
}

export default AuthHelper;
