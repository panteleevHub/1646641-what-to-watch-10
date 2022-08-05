import {Fragment, ChangeEvent, useState} from 'react';

const STARS_COUNT = 10;

function ReviewForm (): JSX.Element {
  const [formData, setFormData] = useState({
    rating: '',
    'review-text': '',
  });

  const handleFieldChange = ({target}: ChangeEvent<(HTMLInputElement | HTMLTextAreaElement)>) => {
    const {name, value} = target;
    setFormData({...formData, [name]: value});
  };

  const starButtons = Array.from({length: STARS_COUNT}, (value, index) => {
    const key = STARS_COUNT - index;

    return (
      <Fragment key={key}>
        <input onChange={handleFieldChange} className="rating__input" id={`star-${key}`} type="radio" name="rating" value={`${key}`} />
        <label className="rating__label" htmlFor={`star-${key}`}>{`Rating ${key}`}</label>
      </Fragment>
    );
  });

  return (
    <form action="#" className="add-review__form">
      <div className="rating">
        <div className="rating__stars">
          {starButtons}
        </div>
      </div>

      <div className="add-review__text">
        <textarea onChange={handleFieldChange} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
}

export default ReviewForm;
