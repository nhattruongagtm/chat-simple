import React, { useState } from "react";
import { useHistory } from "react-router";
import md5 from 'md5'
import { signup } from "../../api/firestore";
import { requestSignUp } from "../../features/auth/signUpSlice";
import { useDispatch } from "react-redux";
interface SignUpPageProps {}
interface SignUpInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  reType: string;
}
export const SignUpPage = (props: SignUpPageProps) => {
  const [isTooglePassword, setIsTooglePassword] = useState<boolean>(false);
  const [isToogleRePassword, setIsToogleRePassword] = useState<boolean>(false);
  const navigate = useHistory();
  const dispatch = useDispatch();
  const [input, setInput] = useState<SignUpInput>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    reType: "",
  });
  const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()

    dispatch(requestSignUp(input))
    

  }
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const name = e.target.name;
    const value = e.target.value;
    setInput({
      ...input,
      [name]: value,
    })
  }
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
              Create new account<span>.</span>
            </p>
            <p>
              Already a member?{" "}
              <span onClick={() => navigate.push("/")}>Log in</span>
            </p>
          </div>
        </div>
        <form className="signup__form" onSubmit={handleSubmitSignUp}>
          <div className="signup__name">
            <div className="signup__name__first signup__name__item signup__item">
              <div className="signup__label">
                First name
                <input type="text" name="firstName" onChange={handleChangeInput} value={input.firstName}/>
              </div>
              <div className="signup__icon__input">
                <i className="fas fa-portrait"></i>
              </div>
            </div>
            <div className="signup__name__first signup__name__item signup__item">
              <div className="signup__label">
                Last name
                <input type="text" name="lastName" onChange={handleChangeInput} value={input.lastName}/>
              </div>
              <div className="signup__icon__input">
                <i className="fas fa-portrait"></i>
              </div>
            </div>
          </div>
          <div className="signup__name__first signup__name__item signup__item signup__email">
            <div className="signup__label">
              Email
              <input type="text" name="email" onChange={handleChangeInput} value={input.email}/>
            </div>
            <div className="signup__icon__input">
              <i className="fas fa-envelope"></i>
            </div>
          </div>
          <div className="signup__name__first signup__name__item signup__item signup__email">
            <div className="signup__label">
              Password
              <input type={isTooglePassword ? "text" : "password"} name="password" value={input.password} onChange={handleChangeInput}/>
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
          <div className="signup__name__first signup__name__item signup__item signup__email">
            <div className="signup__label">
              Retype
              <input type={isToogleRePassword ? "text" : "password"} name="reType" value={input.reType} onChange={handleChangeInput}/>
            </div>
            <div
              className="signup__icon__input"
              onClick={() => setIsToogleRePassword(!isToogleRePassword)}
            >
              {isToogleRePassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </div>
          </div>
          <div className=" signup__btns">
            <button type="button" className="signup__change">
              Change method
            </button>
            <button type="submit" className="signup__submit">
              Create account
            </button>
          </div>
        </form>
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
