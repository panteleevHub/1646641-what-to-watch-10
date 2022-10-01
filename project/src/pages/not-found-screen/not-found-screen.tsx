import {AppRoute} from '../../const';
import './not-found-screen.css';

function NotFoundScreen(): JSX.Element {
  return (
    <section className="not-found">
      <h1>404. Page not found</h1>
      <a href={AppRoute.Main} className='not-found__link'>Go back to the main page</a>
    </section>
  );
}

export default NotFoundScreen;
