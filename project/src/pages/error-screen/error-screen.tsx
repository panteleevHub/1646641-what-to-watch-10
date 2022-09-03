import './error-screen.css';

function ErrorScreen(): JSX.Element {
  return (
    <section className="error-message">
      <h1>Something went wrong.</h1>
      <p className='error-message__desc'>Please check your internet connection or reload the page.</p>
    </section>
  );
}

export default ErrorScreen;
