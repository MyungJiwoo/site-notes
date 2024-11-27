import { styled } from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

export const MemoLayout = styled.div`
  padding: 2rem;
  border-radius: 0.8rem;
  width: 30rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.p`
  margin: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: #858585;
`;

export const StyledTextarea = styled(TextareaAutosize)`
  width: 28rem;
  padding: 1rem;
  border-radius: 10px;

  background-color: #f9f9f9;

  border: none;
  resize: none;

  &:focus {
    outline: none;
  }
`;
