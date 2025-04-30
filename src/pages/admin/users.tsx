import { Helmet } from 'react-helmet-async';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
`;

const UserItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const users = [
  { id: 1, name: '사용자 1', email: 'user1@example.com' },
  { id: 2, name: '사용자 2', email: 'user2@example.com' },
  { id: 3, name: '사용자 3', email: 'user3@example.com' },
];

function Users() {
  return (
    <Container>
      <Helmet>
        <title>사용자 관리 - 관리자 페이지</title>
        <meta name="description" content="사용자 관리 페이지입니다." />
      </Helmet>

      <h2>사용자 관리</h2>
      
      <UserList>
        {users.map(user => (
          <UserItem key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </UserItem>
        ))}
      </UserList>
    </Container>
  );
}

export default Users;
