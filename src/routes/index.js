import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import ProjectEditor from '~/pages/ProjectEditor';
import ProjectDetails from '~/pages/ProjectDetails';

import PrivateRoute from './PrivateRoute';

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute path="/" exact component={SignIn} />
      <PrivateRoute path="/register" component={SignUp} />

      <PrivateRoute path="/dashboard" component={Dashboard} isPrivate />
      <PrivateRoute path="/profile" component={Profile} isPrivate />
      <PrivateRoute path="/project/new" component={ProjectEditor} isPrivate />
      <PrivateRoute
        path="/project/edit/:projectId"
        component={ProjectEditor}
        isPrivate
      />
      <PrivateRoute
        path="/project/details/:projectId"
        component={ProjectDetails}
        isPrivate
      />
      <PrivateRoute path="/*" component={() => <Redirect to="/" />} isPrivate />
    </Switch>
  );
}
