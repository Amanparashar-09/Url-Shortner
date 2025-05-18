import { createRootRoute } from "@tanstack/react-router"
import { authRoute } from "./auth.route"
import { dasboardRoute } from "./dashboard"
import RootLayout from "../RootLayout"

export const rootRoute = createRootRoute({
    component: RootLayout
})

export const routeTree = rootRoute.addChildren([
    authRoute,
    dasboardRoute
])

