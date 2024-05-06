import { FC, useState } from "react";
import { useAppDispatch } from "../hooks/redux-hooks";
import { login, registration } from "../store/slices/userSlice";

 const LoginForm: FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    return (
        <div>
            <input
                type="text"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                value={email}
            />
            <input
                type="text"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                value={password}
            />
            <button onClick={() => dispatch(login({email, password}))}>
                Логин
            </button>
            <button onClick={() => dispatch(registration({email, password}))}>
                Регистрация
            </button>
        </div>
    );
}
 
export default LoginForm;