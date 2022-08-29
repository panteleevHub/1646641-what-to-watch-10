type ShowMoreButtonProps = {
  onShowMoreButtonClick: () => void,
}

function ShowMoreButton({onShowMoreButtonClick}: ShowMoreButtonProps): JSX.Element {
  return (
    <button onClick={onShowMoreButtonClick} className="catalog__button" type="button">Show more</button>
  );
}

export default ShowMoreButton;
