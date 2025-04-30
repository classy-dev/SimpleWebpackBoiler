import React from "react";
import { Link } from "react-router-dom";
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

function Home() {
  return (
    <HomeContainer>
      <Title>Welcome to React Webpack App</Title>
      <Description>
        <Link to="/home">Home</Link> This is a production-ready React application built with
        Webpack and Emotion.
      </Description>
      <ImageContainer>
        <img src="/images/sub_visual1.webp" alt="Example" />
      </ImageContainer>
    </HomeContainer>
  );
}

export default Home;
