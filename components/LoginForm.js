import { loginUser } from "../lib/auth";
import Router from "next/router";

export default class LoginForm extends React.Component {
  state = {
    email: "Sincere@april.biz",
    password: "hildegard.org",
    error: false,
    isLoading: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: false, isLoading: true });
    const { email, password } = this.state;
    loginUser(email, password)
      .then(() => {
        Router.push("/profile");
      })
      .catch((err) => {
        this.showError((err.response && err.response.data) || err.message);
      });
  };

  showError = (err) => {
    this.setState({ error: err, isLoading: false });
  };

  render() {
    const { email, password, error, isLoading } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Submit"}
        </button>
        {error && <div>{error}</div>}
      </form>
    );
  }
}
