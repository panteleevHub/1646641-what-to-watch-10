import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../services/api-actions';

function UserBlock(): JSX.Element {
  const {authorizationStatus, userAvatar} = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <div onClick={() => navigate(AppRoute.MyList)} className="user-block__avatar">
            <img src={userAvatar} alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          <Link onClick={() => dispatch(logoutAction())} to={AppRoute.CurrentPage} className="user-block__link">Sign out</Link>
        </li>
      </ul>
    );
  }

  return (
    <div className="user-block">
      <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
    </div>
  );
}

export default UserBlock;
