import React, { FC, ReactNode } from 'react'
import {
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom'

type Props = RouteProps & {
    auth: boolean;
    component: ReactNode;
}

export const ProtectedRoute: FC<Props> = ({ component: Component, auth, ...tail }) => {
    if (!Component) return null
    return (
    <Route
        {...tail}
        render={(props) => (
            auth
                ? <Component {...props} />
                : <Redirect to="/login" />
        )}
    />
)}