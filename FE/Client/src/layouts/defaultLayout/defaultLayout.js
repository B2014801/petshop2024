import Header from '~/layouts/components/header';
import Footer from '~/layouts/components/footer';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />

            <div>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
