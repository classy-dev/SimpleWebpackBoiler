import { Link, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 20px;
`;

const Navigation = styled.nav`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
`;

const NavLink = styled(Link)`
  margin-right: 15px;
  color: #007bff;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

function AdminLayout() {
  return (
    <Container>
      <Helmet>
        <title>관리자 페이지 - Simple Webpack</title>
        <meta name="description" content="관리자 페이지입니다." />
      </Helmet>

      <h1>관리자 페이지</h1>
      
      <Navigation>
        <NavLink to="/admin">대시보드</NavLink>
        <NavLink to="/admin/users">사용자 관리</NavLink>
        <NavLink to="/admin/settings">설정</NavLink>
      </Navigation>

      {/* 중첩된 라우트의 컴포넌트가 여기에 렌더링됩니다 */}
      <Outlet />
    </Container>
  );
}

export default AdminLayout;
