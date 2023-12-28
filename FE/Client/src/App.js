import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { publicRoutes, privateRoutes } from '~/routes';
import { defaultLayout } from '~/layouts';
import { loadAuthState } from './stores/auth.store';
import { UserHome } from './pages/user';

function App() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = defaultLayout;

                    if (route.Layout) {
                        Layout = route.Layout;
                    } else if (route.Layout === null) {
                        Layout = Fragment;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page></Page>
                                </Layout>
                            }
                        />
                    );
                })}
                {privateRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = defaultLayout;

                    if (route.Layout) {
                        Layout = route.Layout;
                    } else if (route.Layout === null) {
                        Layout = Fragment;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={<Layout>{user ? <Page></Page> : <Navigate to={'/login'} />}</Layout>}
                        >
                            {route.nestRoute &&
                                route.nestRoute.map((nestedRoute, index) => {
                                    const Page2 = nestedRoute.component;
                                    return (
                                        <Route
                                            key={'nest' + nestedRoute.path}
                                            path={nestedRoute.path}
                                            element={<Page2></Page2>}
                                        />
                                    );
                                })}
                        </Route>
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
