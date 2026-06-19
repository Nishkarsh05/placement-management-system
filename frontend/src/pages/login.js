import { Link } from 'react-router-dom';

function Login() {
  return (
    <main className="authPage">
      <section className="authPanel">
        <p className="eyebrow">Welcome back</p>
        <h1>Login to your placement portal</h1>
        <form className="formStack">
          <label>
            Email
            <input type="email" placeholder="student@test.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Enter password" />
          </label>
          <button className="primaryButton" type="submit">Login</button>
        </form>
        <p className="mutedText">
          New user? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
