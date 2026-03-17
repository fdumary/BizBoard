import { Link, useLocation, useNavigate } from "react-router-dom";

type NavigationBarProps = {
  showBackButton?: boolean;
};

function NavigationBar({ showBackButton = false }: NavigationBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("bizboard-token");

  const handleLogout = () => {
    localStorage.removeItem("bizboard-token");
    navigate("/login");
  };

  return (
    <nav className="top-nav" aria-label="Primary navigation">
      <div className="top-nav__left">
        <Link className="top-nav__brand" to={token ? "/" : "/login"}>BizBoard</Link>
        {showBackButton && (
          <button className="top-nav__back" type="button" onClick={() => navigate(-1)}>
            Back
          </button>
        )}
      </div>
      <div className="top-nav__links">
        {token && location.pathname !== "/" && <Link to="/">Dashboard</Link>}
        {!token && location.pathname !== "/login" && <Link to="/login">Sign in</Link>}
        {token && location.pathname !== "/login" && (
          <button className="top-nav__logout" type="button" onClick={handleLogout}>
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
}

export { NavigationBar };
