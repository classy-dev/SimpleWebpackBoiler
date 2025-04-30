import { Link } from 'react-router-dom';
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

function About() {
  return (
    <Container>
      <Helmet>
        <title>About - Simple Webpack</title>
        <meta name="description" content="Simple Webpack 프로젝트의 About 페이지입니다." />
      </Helmet>
      
      <Title>About 페이지</Title>
      <p>이 프로젝트는 Webpack, React, TypeScript를 사용하여 구축되었습니다.</p>
      <BackButton to="/">홈으로 돌아가기</BackButton>
    </Container>
  );
}

export default About;
