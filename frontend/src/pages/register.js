import { Link } from 'react-router-dom';

function Register() {
  return (
    <main className="authPage">
      <section className="authPanel wide">
        <p className="eyebrow">Create account</p>
        <h1>Register for placement access</h1>
        <form className="formGrid">
          <label>
            Name
            <input type="text" placeholder="Full name" />
          </label>
          <label>
            Email
            <input type="email" placeholder="name@example.com" />
          </label>
          <label>
            Phone
            <input type="tel" placeholder="Phone number" />
          </label>
          <label>
            Role
            <select defaultValue="student">
              <option value="student">Student</option>
              <option value="recruiter">Recruiter</option>
              <option value="tpo">TPO</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <label>
            Department
            <input type="text" placeholder="CSE" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Minimum 6 characters" />
          </label>
          <button className="primaryButton fullWidth" type="submit">Register</button>
        </form>
        <p className="mutedText">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
