import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const fetchProfile = async () => {
    const res = await axios.get("http://localhost:5000/api/auth/me", {
      withCredentials: true,
      crossDomain: true,
    });
    if (res) {
      setProfile(res.data);
    }
  };
  const login = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", user, {
      withCredentials: true,
    });
    if (res) {
      console.log(res.data);
    }
  };
  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  return (
    <div>
      <a href="http://localhost:5000/api/auth/google">Login with google</a>
      <br />
      <input id="email" value={email} onChange={onChange} />
      <br />
      <input
        id="password"
        type="password"
        value={password}
        onChange={onChange}
      />
      <br />
      <button onClick={login}>Login</button>
      <br />
      <button onClick={fetchProfile}>Get Profile</button>
      {profile && <p>{profile.data.name}</p>}
    </div>
  );
};

export default Home;
