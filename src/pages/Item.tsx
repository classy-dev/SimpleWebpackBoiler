import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const BackButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 20px;
  
  &:hover {
    background-color: #5a6268;
  }
`;

function Item() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <Container>
      <Helmet>
        <title>아이템 {id} - Simple Webpack</title>
        <meta name="description" content={`아이템 ${id}의 상세 정보 페이지입니다.`} />
      </Helmet>
      
      <Title>아이템 {id} 상세 정보</Title>
      <p>이것은 아이템 {id}의 상세 페이지입니다.</p>
      <BackButton to="/">홈으로 돌아가기</BackButton>
    </Container>
  );
}

export default Item;
