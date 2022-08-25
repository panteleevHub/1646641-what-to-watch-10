import {Fragment, ChangeEvent, useState, FormEvent, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchAddReviewAction} from '../../services/api-actions';

const STARS_COUNT = 10;

const ReviewLength = {
  Min: 50,
  Max: 400,
} as const;

type ReviewFormProps = {
  filmId: number,
}

function ReviewForm ({filmId}: ReviewFormProps): JSX.Element {
  const isRewiewSending = useAppSelector((state) => state.isReviewSending);
  const [formData, setFormData] = useState({
    rating: '',
    review: '',
  });

  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const dispatch = useAppDispatch();

  const setFormActivity = () => {
    if (formRef.current === null || submitButtonRef.current === null) {
      return;
    }

    formRef.current.disabled = true;
    submitButtonRef.current.disabled = true;
  };

  const setButtonActivity = () => {
    const isReviewValid = formData.review.length >= ReviewLength.Min && formData.review.length <= ReviewLength.Max;

    if (submitButtonRef.current === null) {
      return;
    }

    if (formData.rating && isReviewValid) {
      submitButtonRef.current.disabled = false;
    } else {
      submitButtonRef.current.disabled = true;
    }
  };

  const handleFieldChange = ({target}: ChangeEvent<(HTMLInputElement | HTMLTextAreaElement)>) => {
    const {name, value} = target;
    setFormData({...formData, [name]: value});
    setButtonActivity();
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const reviewData = {
      comment: formData.review,
      rating: Number(formData.rating),
      filmId,
    };

    dispatch(fetchAddReviewAction(reviewData));
  };

  if (isRewiewSending) {
    setFormActivity();
  }

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
    <form ref={formRef} onSubmit={handleFormSubmit} action="#" className="add-review__form">
      <div className="rating">
        <div className="rating__stars">
          {starButtons}
        </div>
      </div>

      <div className="add-review__text">
        <textarea onChange={handleFieldChange} className="add-review__textarea" name="review" id="review-text" placeholder="Review text" minLength={ReviewLength.Min} maxLength={ReviewLength.Max} required></textarea>
        <div className="add-review__submit">
          <button ref={submitButtonRef} className="add-review__btn" type="submit" disabled>Post</button>
        </div>

      </div>
    </form>
  );
}

export default ReviewForm;
