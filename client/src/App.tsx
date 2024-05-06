import { FC, useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import { IUser } from "./models/IUser";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";
import { checkAuth, logout } from "./store/slices/userSlice";
import UserService from "./services/UserService";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<IUser[]>([])
  const user = useAppSelector(state => state.userReducer);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [dispatch])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data)
    } catch (e) {
      console.log(e);
    }
  }

  if (user.isLoading) {
    return (
      <>
        <div>Загрузка</div>
        <button onClick={() => dispatch(logout())}>Выйти</button>
      </>
    )
    
  }

  if (!user.isAuth) {
    return (
      <div>
        <LoginForm />
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
    )
  }

  return (
      <div>
        <h1>{user.isAuth ? `Пользователь авторизован под ${user.user?.email}` : `АВТОРИЗУЙТЕСЬ`}</h1>
        <h1>{user.user?.isActivated ? `Аккаунт подтвержден по почте ${user.user.email}` : `Подтвердите аккаунт`}</h1>
        <button onClick={() => dispatch(logout())}>Выйти</button>
        <div>
          <button onClick={getUsers}>Получить пользователей</button>
        </div>
        {users.map(user => 
          <div key={user.email}>{user.email}</div>
        )}
      </div>
  );
}

export default App;