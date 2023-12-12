import Header from '~/layouts/components/header';
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />

            <div>{children}</div>
        </div>
    );
}

export default DefaultLayout;
