import React from "react";
import { Header } from "../components";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header />
            {children}
        </div>
    );
};

export const withLayout = (Page: React.FC): React.FC => () => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
};
