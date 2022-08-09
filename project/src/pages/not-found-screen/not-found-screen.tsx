import {Link} from 'react-router-dom';
import './not-found-screen.css';

function NotFoundScreen(): JSX.Element {
  return (
    <section className="not-found">
      <h1>404. Page not found</h1>
      <Link to="/" className='not-found__link'>Вернуться на главную</Link>
    </section>
  );
}

export default NotFoundScreen;
