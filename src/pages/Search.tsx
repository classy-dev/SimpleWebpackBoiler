import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
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

const SearchForm = styled.form`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  width: 200px;
`;

const SearchButton = styled.button`
  padding: 8px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const ResultList = styled.div`
  margin-top: 20px;
  text-align: left;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ResultItem = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 4px;

  &:hover {
    background-color: #f8f9fa;
  }
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

// 가상의 검색 데이터
const searchData = [
  { id: 1, title: '리액트 기초', content: '리액트의 기본 개념과 사용법' },
  { id: 2, title: '타입스크립트 시작하기', content: '타입스크립트 입문 가이드' },
  { id: 3, title: '웹팩 설정', content: '웹팩 설정 방법과 최적화' },
  { id: 4, title: '리액트 라우터', content: '리액트 라우터 사용법' },
  { id: 5, title: '상태 관리', content: '리액트 상태 관리 방법' },
];

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<typeof searchData>([]);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      // 실제로는 API 호출을 하겠지만, 여기서는 로컬 데이터를 필터링
      const filtered = searchData.filter(
        item => 
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.content.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm });
    }
  };

  return (
    <Container>
      <Helmet>
        <title>검색 - Simple Webpack</title>
        <meta name="description" content="Simple Webpack 프로젝트의 검색 페이지입니다." />
      </Helmet>

      <Title>검색</Title>
      
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어를 입력하세요..."
        />
        <SearchButton type="submit">검색</SearchButton>
      </SearchForm>

      <ResultList>
        {results.map(item => (
          <ResultItem key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </ResultItem>
        ))}
        {searchParams.get('q') && results.length === 0 && (
          <p>검색 결과가 없습니다.</p>
        )}
      </ResultList>

      <BackButton to="/">홈으로 돌아가기</BackButton>
    </Container>
  );
}

export default Search;
