import React from 'react';
import styled from '@emotion/styled';

type InputProps = {
  linkText: string;
  onClick: () => void;
};

const Styled = styled.button`
  border: none;
  position: relative;
  color: var(--color-link);
  text-decoration: none;
  background-color: transparent;
  cursor: pointer;
  font-size: var(--font-size-p);
  transition: 0.2s;
  margin-bottom: 0.25rem;
  padding: 0;

  &:hover {
    color: var(--color-link-hover);
  }
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: var(--color-purple);
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease-in-out 0s;
  }

  &:hover::before {
    visibility: visible;
    transform: scaleX(1);
  }
`;

const Link = ({ linkText, onClick }: InputProps) => {
  return (
    <Styled type="button" onClick={onClick}>
      {linkText}
    </Styled>
  );
};

export default Link;
