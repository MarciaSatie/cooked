import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../../auth/AuthContextType";
import AuthPage from "../../auth/AuthPage";
import CategoriesPage from "../../pages/categoriesPage";
import FavoritesPage from "../../pages/favoritesPage";
import Home from "../../pages/homePage";
import RecipesDetailPage from "../../pages/recipesDetailPage";
import SurpriseMe from "../../pages/surpriseMe";
import Signup from '../../auth/Signup'


export default function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) return null; // or spinner

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/home" replace /> : <AuthPage />}
      />
      <Route
        path="/sign-up"
        element={ <Signup /> }
      />
      <Route
        path="/home"
        element={user ? <Home /> : <Navigate to="/" replace />}
      />
      <Route
        path="/surpriseMe"
        element={user ? <SurpriseMe /> : <Navigate to="/" replace />}
      />
      <Route
        path="/favorites"
        element={user ? <FavoritesPage /> : <Navigate to="/" replace />}
      />
      <Route
        path="/recipesAtoZ/:id"
        element={user ? <RecipesDetailPage /> : <Navigate to="/" replace />}
      />
      <Route
        path="/categories"
        element={user ? <CategoriesPage /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}