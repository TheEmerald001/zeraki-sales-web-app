import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/user/userSlice";

const RequireAuth = () => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  if (!user || !user.id) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
