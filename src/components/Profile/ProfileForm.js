import { useRef, useContext } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../Store/Global-context.js";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const newPasswordInputRef = useRef("");
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    //add validation
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCGEJCMbKbsNcr4gLBDqoLu0jGwz8uSlkM",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      //asumption: always succeeds!
      history.replace("/");
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
