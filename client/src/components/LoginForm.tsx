import { FC, useContext, useState } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";

 const LoginForm: FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {store} = useContext(Context);
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
            <button onClick={() => store.login(email, password)}>
                Логин
            </button>
            <button onClick={() => store.registration(email, password)}>
                Регистрация
            </button>
        </div>
    );
}
 
export default observer(LoginForm);