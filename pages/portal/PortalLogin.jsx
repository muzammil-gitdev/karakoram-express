import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PortalLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate auth — replace with real API call
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify({
          email, password
        })
      });
      const data = await res.json();
      console.log(data)
      if (!data.success) {
        throw new Error(data.message)
      }

      // On success, navigate to the portal dashboard
      navigate("/portal");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 bg-primary" />

      {/* Decorative gradient orbs */}
      <div
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-secondary-container), transparent 70%)",
        }}
      />
      <div
        className="absolute -right-32 -bottom-32 h-[400px] w-[400px] rounded-full opacity-15 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-inverse-primary), transparent 70%)",
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ===== LOGIN CARD ===== */}
      <div className="login-card-enter relative z-10 mx-4 w-full max-w-[440px]">
        {/* Card */}
        <div
          className="rounded-3xl border border-white/[0.08] px-8 py-10 sm:px-10 sm:py-12"
          style={{
            background:
              "linear-gradient(145deg, rgba(15, 42, 74, 0.95), rgba(0, 21, 47, 0.9))",
            backdropFilter: "blur(40px)",
            boxShadow:
              "0 32px 64px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
          }}
        >
          {/* Brand Header */}
          <div className="mb-8 text-center">
            <div className="bg-secondary mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg">
              <span className="material-symbols-outlined text-on-secondary text-[28px]">
                admin_panel_settings
              </span>
            </div>
            <h1 className="text-display-lg text-on-primary mb-1 text-[28px] leading-9">
              Welcome Back
            </h1>
            <p className="text-body-md text-on-primary/50">
              Sign in to the Karakoram Express admin portal
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="login-error-enter bg-error/10 border-error/20 mb-6 flex items-center gap-3 rounded-xl border px-4 py-3">
              <span className="material-symbols-outlined text-error text-[20px]">
                error
              </span>
              <span className="text-label-md text-error/90">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="group">
              <label
                htmlFor="admin-email"
                className="text-label-sm text-on-primary/50 mb-1.5 block tracking-wider uppercase"
              >
                Email Address
              </label>
              <div
                className={`flex items-center gap-3 rounded-xl border px-4 transition-all duration-300 ${focusedField === "email"
                  ? "border-secondary/60 bg-primary-container/40 shadow-[0_0_0_3px_rgba(166,59,0,0.1)]"
                  : "border-on-primary/10 bg-primary-container/20 hover:border-on-primary/20"
                  }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-colors duration-300 ${focusedField === "email"
                    ? "text-secondary-fixed-dim"
                    : "text-on-primary/30"
                    }`}
                >
                  mail
                </span>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="admin@karakoram.pk"
                  className="text-body-md text-on-primary placeholder:text-on-primary/25 h-12 w-full bg-transparent focus:outline-none"
                // autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label
                htmlFor="admin-password"
                className="text-label-sm text-on-primary/50 mb-1.5 block tracking-wider uppercase"
              >
                Password
              </label>
              <div
                className={`flex items-center gap-3 rounded-xl border px-4 transition-all duration-300 ${focusedField === "password"
                  ? "border-secondary/60 bg-primary-container/40 shadow-[0_0_0_3px_rgba(166,59,0,0.1)]"
                  : "border-on-primary/10 bg-primary-container/20 hover:border-on-primary/20"
                  }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-colors duration-300 ${focusedField === "password"
                    ? "text-secondary-fixed-dim"
                    : "text-on-primary/30"
                    }`}
                >
                  lock
                </span>
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  className="text-body-md text-on-primary placeholder:text-on-primary/25 h-12 w-full bg-transparent focus:outline-none"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-on-primary/30 hover:text-on-primary/60 cursor-pointer transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="admin-login-submit"
              type="submit"
              disabled={isLoading}
              className="bg-secondary hover:bg-secondary-container text-on-secondary text-label-md mt-2 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl font-bold shadow-lg transition-all duration-300 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="login-spinner inline-block h-5 w-5 rounded-full border-2 border-white/30 border-t-white" />
                  Authenticating...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">
                    login
                  </span>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-on-primary/10" />
            <span className="text-label-sm text-on-primary/30">
              ADMIN ACCESS ONLY
            </span>
            <div className="h-px flex-1 bg-on-primary/10" />
          </div>

          {/* Back to Website */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-label-md text-on-primary/40 hover:text-secondary-fixed-dim inline-flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
              Back to Website
            </a>
          </div>
        </div>

        {/* Security badge */}
        <div className="mt-6 flex items-center justify-center gap-2 opacity-40">
          <span className="material-symbols-outlined text-on-primary text-[16px]">
            verified_user
          </span>
          <span className="text-label-sm text-on-primary">
            Secured with 256-bit encryption
          </span>
        </div>
      </div>
    </div>
  );
}
