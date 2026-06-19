import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="notFoundPage">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p className="mutedText">The page you opened does not exist in this placement portal.</p>
      <Link className="primaryButton linkButton" to="/">Back to dashboard</Link>
    </main>
  );
}

export default NotFound;
