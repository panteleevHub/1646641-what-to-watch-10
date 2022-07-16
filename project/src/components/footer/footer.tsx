import Logo from '../logo/logo';

const FOOTER_LOGO_CLASS = 'logo__link--light';

function Footer(): JSX.Element {
  return (
    <footer className="page-footer">
      <div className="logo">
        <Logo footerLogo={FOOTER_LOGO_CLASS}/>
      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;
