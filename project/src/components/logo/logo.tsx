import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

type LogoProps = {
  footerLogo?: string,
}

function Logo({footerLogo}: LogoProps): JSX.Element {
  return (
    <div className="logo">
      <Link to={AppRoute.Main} className={footerLogo ? `logo__link ${footerLogo}` : 'logo__link'}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
