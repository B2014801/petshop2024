import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { publicRoutes, privateRoutes } from '~/routes';
import { defaultLayout } from '~/layouts';
import { loadAuthState } from './stores/auth.store';

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
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
