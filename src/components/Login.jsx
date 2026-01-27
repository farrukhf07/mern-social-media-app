import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function Login({setIsLoggedIn}) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e)=>{
      e.preventDefault();
      setError("");
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          setError(data.error || "Login failed");
          setLoading(false);
          return;
        }
  
        // ✅ SAVE TOKEN
        localStorage.setItem("token", data.authToken);
        localStorage.setItem("isLoggedIn", "true");
  
        setIsLoggedIn(true);
        navigate("/home");
  
      } catch (err) {
        setError("Server not reachable");
      } finally {
        setLoading(false);
      }
    }

  return (
    <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <h3 className="text-center mb-4 mt-3">Login Form</h3>
          {error && (
            <div className="alert alert-danger" role='alert'>{error}</div>
          )}
          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
                <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Username</label>
            </div>

            <div className="form-floating mb-3">
                <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="container my-3">
              <span>Don't have account <u style={{cursor:'pointer'}} onClick={()=>{navigate("/register")}}>Register</u></span>
            </div>
            <div className="text-center">
                <button className="btn btn-primary px-4">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer isFixed={true}/>
    </>
  )
}

export default Login