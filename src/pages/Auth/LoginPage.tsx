import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { facebookProvider, googleProvider } from "../../config/authMethods";
import { requestLogin } from "../../features/auth/signUpSlice";
import socialAuth from "../../service/auth";
import { RootState } from "../../store";

interface LoginPageProps {}
interface LoginInput {
  email: string;
  password: string;
}
const LoginPage = (props: LoginPageProps) => {
  const [input, setInput] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const loading = useSelector((state: RootState)=>state.signUp.isLoading)

  const [isTooglePassword, setIsTooglePassword] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(requestLogin(input));  
  };
  const handleLoginApi = async (
    provider: FacebookAuthProvider | GoogleAuthProvider
  ) => {
    const result = await socialAuth(provider);
    console.log(result);
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({
      ...input,
      [name]: value,
    });
  };
  return (
    <div className="signup">
      <div className="signup__container">
        <div className="signup__header">
          <img src="./assets/logo.svg" alt="" />
          T-Messenger<span>.</span>
        </div>
        <div className="signup__main">
          <div className="signup__main__title">
            <p>start for free</p>
            <p>
              Login to Chat<span>.</span>
            </p>
            <p>
              Don't have an account?{" "}
              <span onClick={() => history.push("/signup")}>Sign up</span>
            </p>
          </div>
        </div>
        <form className="signup__form" onSubmit={handleLogin}>
          <div className="signup__name__first signup__name__item signup__item signup__email">
            <div className="signup__label">
              Email
              <input
                name="email"
                value={input.email}
                onChange={handleChangeInput}
                type="text"
              />
            </div>
            <div className="signup__icon__input">
              <i className="fas fa-envelope"></i>
            </div>
          </div>
          <div className="signup__name__first signup__name__item signup__item signup__email">
            <div className="signup__label">
              Password
              <input
                name="password"
                value={input.password}
                onChange={handleChangeInput}
                type={isTooglePassword ? "text" : "password"}
              />
            </div>
            <div
              className="signup__icon__input"
              onClick={() => setIsTooglePassword(!isTooglePassword)}
            >
              {isTooglePassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </div>
          </div>
          <div className=" signup__btns">
            <button type="button" className="signup__change">
              Forgot Password
            </button>
            <button type="submit" className="signup__submit">
              {loading ? 'Processing...' : 'Login'}
            </button>
          </div>
        </form>
        <p className="login__option">or</p>
        <div className="login__api">
          <div
            className="login__api__item login--fb"
            onClick={() => handleLoginApi(facebookProvider)}
          >
            <img src="./assets/fb.svg" alt="" />
          </div>
          <div
            className="login__api__item login--gg"
            onClick={() => handleLoginApi(googleProvider)}
          >
            <img src="./assets/gg.svg" alt="" />
          </div>
        </div>
      </div>
      <div className="background">
        <img
          src="https://www.trustedreviews.com/wp-content/uploads/sites/54/2019/04/facebook-messenger-dark-mode-1024x576.png"
          alt=""
        />
        <div className="signup__layer"></div>
      </div>
    </div>
  );
};

export default LoginPage;
