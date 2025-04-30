import { Helmet } from 'react-helmet-async';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #218838;
  }
`;

function Settings() {
  return (
    <Container>
      <Helmet>
        <title>설정 - 관리자 페이지</title>
        <meta name="description" content="관리자 설정 페이지입니다." />
      </Helmet>

      <h2>설정</h2>
      
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <Label>사이트 이름</Label>
          <Input type="text" defaultValue="Simple Webpack" />
        </FormGroup>
        
        <FormGroup>
          <Label>관리자 이메일</Label>
          <Input type="email" defaultValue="admin@example.com" />
        </FormGroup>
        
        <FormGroup>
          <Label>알림 설정</Label>
          <Input type="checkbox" defaultChecked /> 이메일 알림 사용
        </FormGroup>
        
        <Button type="submit">설정 저장</Button>
      </Form>
    </Container>
  );
}

export default Settings;
