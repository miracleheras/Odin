import { styled } from "styled-components";

export const HeaderContainer = styled.header`
  background: transparent;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 100px;
  right: 0;
  z-index: 1000;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Logo = styled.h1`
  color: #ff4444;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;