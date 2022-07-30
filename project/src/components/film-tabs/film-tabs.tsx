import {useState, MouseEvent} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, FilmInfo} from '../../const';
import {Film} from '../../types/film';
import {Review} from '../../types/review';
import Overview from '../overview/overview';
import Details from '../details/details';
import Reviews from '../reviews/reviews';

type FilmTabsProps = {
  film: Film,
  reviews: Review[],
};

function FilmTabs ({film, reviews}: FilmTabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>(FilmInfo.Overview);

  const handleTabClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    setActiveTab(evt.currentTarget.dataset.tabName as string);
  };

  const getActiveTabComponent = (tab: string) => {
    switch (tab) {
      case FilmInfo.Overview:
        return <Overview film={film} />;
      case FilmInfo.Details:
        return <Details film={film} />;
      case FilmInfo.Reviews:
        return <Reviews reviews={reviews} />;
    }
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item ${activeTab === FilmInfo.Overview && 'film-nav__item--active'}`}>
            <Link to={AppRoute.CurrentPage} className="film-nav__link" data-tab-name={FilmInfo.Overview} onClick={handleTabClick}>Overview</Link>
          </li>
          <li className={`film-nav__item ${activeTab === FilmInfo.Details && 'film-nav__item--active'}`}>
            <Link to={AppRoute.CurrentPage} className="film-nav__link" data-tab-name={FilmInfo.Details} onClick={handleTabClick}>Details</Link>
          </li>
          <li className={`film-nav__item ${activeTab === FilmInfo.Reviews && 'film-nav__item--active'}`}>
            <Link to={AppRoute.CurrentPage} className="film-nav__link" data-tab-name={FilmInfo.Reviews} onClick={handleTabClick}>Reviews</Link>
          </li>
        </ul>
      </nav>
      {getActiveTabComponent(activeTab)}
    </div>
  );
}

export default FilmTabs;
