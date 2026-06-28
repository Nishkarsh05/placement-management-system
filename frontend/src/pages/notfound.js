import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="notFoundV2">
      <p className="caption">404</p>
      <h1>Page not found</h1>
      <p>This page does not exist in the placement portal.</p>
      <Link to="/dashboard">Back to dashboard</Link>
    </main>
  );
}

export default NotFound;