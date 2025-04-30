import { ReactNode } from "react";
import styled from "@emotion/styled";

interface LayoutProps {
  children: ReactNode;
}

const LayoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

function Layout({ children }: LayoutProps) {
  return <LayoutContainer>{children}</LayoutContainer>;
}

export default Layout;
