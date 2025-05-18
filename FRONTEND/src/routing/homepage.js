import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import HomePage from "../pages/HomePage"
import { checkAuth } from "../utils/helper"

export const homePageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/home',
    component: HomePage,
    beforeLoad: checkAuth
  })