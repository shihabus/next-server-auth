import { loginUser } from "../lib/auth";

export default class LoginForm extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("state", this.state);
    const { email, password } = this.state;
    //   loginUser(email, password)
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
