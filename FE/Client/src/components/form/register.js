function Register() {
    return (
        <div class="container col-md-6 col-10 border border-primary rounded p-0 my-2">
            <form>
                <h3 class="bg-success text-white p-2 text-organ text-center">Tạo tài khoản</h3>
                <div class="m-3">
                    <div class="form-group font-weight-bold">
                        <label for="name">
                            Họ tên <strong class="text-danger">(*)</strong>{' '}
                        </label>
                        <div>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                class="form-control"
                                placeholder="Họ tên"
                                v-model="formData.name"
                            />
                        </div>
                        {/* <ErrorMessage name="name" class="text-danger" /> */}
                    </div>
                    <div class="form-group font-weight-bold mt-2">
                        <label for="email">
                            Email <strong class="text-danger">(*)</strong>{' '}
                        </label>
                        <div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                class="form-control"
                                placeholder="Vui lòng nhập vào email của bạn"
                                v-model="formData.email"
                            />
                        </div>
                        {/* <ErrorMessage name="email" class="text-danger" /> */}
                        <span v-if="isShowFailRegister" name="email" class="text-danger">
                            email đã tồn tại
                        </span>
                    </div>
                    <div class="form-group font-weight-bold mt-2">
                        <label for="phone">
                            Phone <strong class="text-danger">(*)</strong>{' '}
                        </label>
                        <div>
                            <input
                                type="phone"
                                id="phone"
                                name="phone"
                                class="form-control"
                                placeholder="Vui lòng nhập phone của bạn"
                                v-model="formData.phone"
                            />
                        </div>
                        {/* <ErrorMessage name="phone" class="text-danger" /> */}
                    </div>
                    <div class="form-group font-weight-bold mt-2">
                        <label for="password">
                            Mật khẩu <strong class="text-danger">(*)</strong>{' '}
                        </label>
                        <div class="input-group border">
                            <input
                                id="password"
                                name="password"
                                // :type="isShowPassword1 ? 'text' : 'password'"
                                class="form-control border-0"
                                placeholder="Nhập mật khẩu của bạn"
                                v-model="formData.password"
                            />
                        </div>
                        {/* <ErrorMessage name="password" class="text-danger" /> */}
                    </div>
                    <div class="form-group font-weight-bold mt-2">
                        <label for="password_repeat">
                            Lặp lại mật khẩu <strong class="text-danger">(*)</strong>{' '}
                        </label>
                        <div class="input-group border">
                            <input
                                id="password_repeat"
                                name="password_repeat"
                                // :type="isShowPassword2 ? 'text' : 'password'"
                                class="form-control border-0"
                                placeholder="Nhập mật khẩu của bạn"
                            />
                        </div>
                    </div>
                    {/* <Address
                :isClickSubmit="isClickSubmit"
                @isChosenAddress="isChosenAddress"
                @address:data="getAddressData"
            >
            </Address> */}
                    <div class="btn-login-register-container">
                        <button class="btn btn-info me-4" name="dangky" type="submit">
                            Đăng ký
                        </button>
                        <button to="/login" class="btn btn-info" name="dangky">
                            Đăng nhập
                        </button>
                    </div>
                    <div class="login-choice">
                        <span>Đăng ký với</span>
                    </div>
                    {/* <Oauth @submit:oauthdata="handleSubmitCreateOauth" /> */}
                </div>
            </form>
        </div>
    );
}

export default Register;
