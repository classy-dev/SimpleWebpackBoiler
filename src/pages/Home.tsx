import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import styled from "@emotion/styled";

const HomeContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #666;
  line-height: 1.6;
`;

const ImageContainer = styled.div`
  margin: 2rem 0;
  img {
    max-width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const LinkButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin: 10px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const SearchButton = styled(LinkButton)`
  background-color: #28a745;
  
  &:hover {
    background-color: #218838;
  }
`;

const NavigateButton = styled.button`
  display: inline-block;
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  text-decoration: none;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
  
  &:hover {
    background-color: #c82333;
  }
`;

const items = [
  { id: 1, name: '첫 번째 아이템' },
  { id: 2, name: '두 번째 아이템' },
  { id: 3, name: '세 번째 아이템' },
];

function Home() {
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/item/${id}`, {
      state: { from: 'home' }
    });
  };

  const handleSearchNavigate = () => {
    // 쿼리 파라미터와 함께 이동
    navigate({
      pathname: '/Search',
      search: '?q=타입스크립트'
    });
  };

  return (
    <HomeContainer>
      <Helmet>
        <title>홈 페이지 - Simple Webpack</title>
        <meta name="description" content="Simple Webpack 프로젝트의 홈페이지입니다." />
      </Helmet>
      
      <Title>Welcome to React Webpack App</Title>
      <Description>
        <LinkButton to="/about">About</LinkButton> This is a production-ready React application built with
        Webpack and Emotion.
      </Description>
      <div>
        <LinkButton to="/about">About 페이지로</LinkButton>
        <SearchButton to="/Search">Link로 검색 페이지 이동</SearchButton>
        <NavigateButton onClick={handleSearchNavigate}>
          Navigate로 검색 페이지 이동
        </NavigateButton>
        <LinkButton to="/admin" style={{ backgroundColor: '#6f42c1' }}>
          관리자 페이지
        </LinkButton>
        
        <div style={{ marginTop: '20px' }}>
          {items.map(item => (
            <div key={item.id} style={{ margin: '10px 0' }}>
              <LinkButton to={`/item/${item.id}`}>
                Link로 {item.name} 상세보기
              </LinkButton>
              <NavigateButton onClick={() => handleNavigate(item.id)}>
                Navigate로 {item.name} 상세보기
              </NavigateButton>
            </div>
          ))}
        </div>
      </div>
      <ImageContainer>
        <img src="/images/sub_visual1.webp" alt="Example" />
      </ImageContainer>
    </HomeContainer>
  );
}

export default Home;
