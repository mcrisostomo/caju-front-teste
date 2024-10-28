import styled from 'styled-components';

export const LoadingIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);

  @keyframes spin {
    0% {
      transform: rotate(0deg) scaleX(-1);
    }
    100% {
      transform: rotate(360deg) scaleX(-1);
    }
  }

  svg {
    color: #fff;
    width: 250px;
    height: 250px;
    animation: spin 2s linear infinite;
  }
`;

export const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
`;
