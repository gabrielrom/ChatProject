import React from 'react';
import {
  Redirect,
  Route as ReactRouteDOM,
  RouteProps as ReactRouteDOMProps
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactRouteDOMProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactRouteDOM
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user.userId  ? (
          <Component />
        ) : (
          <Redirect 
            to={{
              pathname: isPrivate ? '/' : '/chathub',
              state: { from: location }
            }}
          />
        )
      }}
    />
  );
};

export default Route;