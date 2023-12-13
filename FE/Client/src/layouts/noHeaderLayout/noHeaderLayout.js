function DefaultLayout({ children }) {
    return (
        <div>
            no header
            <div>{children}</div>
        </div>
    );
}

export default DefaultLayout;
