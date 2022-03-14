import styled from 'styled-components';

export const Wrapper = styled.div`
  opacity: 1;
  transition: opacity 0.5s ease-in;
  &.hidden {
    opacity: 0.3;
  }
`;
export const Content = styled.div``;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 100vh;
  filter: brightness(90%);
`;