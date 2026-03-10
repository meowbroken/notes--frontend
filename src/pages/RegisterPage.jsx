import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "../AuthContext";   

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await register(email, password);
      toast.success("Account created");
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message || "Registration failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-xl border border-base-content/10">
          <div className="card-body">
            <h2 className="card-title text-2xl">Register</h2>
            <p className="text-base-content/60">
              Create an account to start saving notes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full focus:input-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full focus:input-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Confirm password</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full focus:input-primary"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full gap-2"
                disabled={
                  loading ||
                  !email.trim() ||
                  !password.trim() ||
                  !confirmPassword.trim()
                }
              >
                {loading && <Loader2 className="size-4 animate-spin" />}
                {loading ? "Creating..." : "Create account"}
              </button>
            </form>
            <div className="divider my-2" />

            <p className="text-sm text-base-content/60">
              Already have an account?{" "}
              <Link className="link link-primary" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

