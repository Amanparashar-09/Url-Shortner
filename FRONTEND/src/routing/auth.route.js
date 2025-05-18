import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import AuthPage from "../pages/AuthPage"
import { redirect } from "@tanstack/react-router"

export const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: AuthPage,
    beforeLoad: async ({ context }) => {
      try {
        const { store } = context;
        const { isAuthenticated } = store.getState().auth;

        // If user is already authenticated, redirect to dashboard
        if (isAuthenticated) {
          throw redirect({ to: '/dashboard' });
        }

        return {};
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw error;
      }
    }
  })