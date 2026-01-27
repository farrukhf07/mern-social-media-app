import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register({setIsLoggedIn}) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);

        try{
            const response = await fetch("http://localhost:5000/api/auth/createuser",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({name, email, password})
            });
            const data = await response.json();

            if(!response.ok){
                setError(data.error || "Registration failed");
                setLoading(false);
                return;
            }
            // Save TOKEN After Registration
            // localStorage.setItem("token", data.authToken);
            // localStorage.setItem("isLoggedIn", "true");
            // setIsLoggedIn(true);

            navigate("/login");
        } catch(error){
            setError("Server not reachable")
        } finally{
            setLoading(false);
        }
    };

  return (
    <>
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3 text-center">Create Account</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={5}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>
    </div>
    </>
  )
}

export default Register