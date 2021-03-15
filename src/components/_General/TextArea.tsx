import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';

type InputProps = {
  height: string;
  width: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

type TextAreaType = {
  height: string;
  width: string;
};

const Styled = styled.textarea<TextAreaType>`
  background: var(--color-almostBlack);
  border-color: var(--color-lighterBlack);
  box-sizing: border-box;
  border-radius: var(--border-radius);
  height: ${(p) => p.height};
  width: ${(p) => p.width};
  color: var(--color-white);
  font-size: var(--font-size-additional-p);
  font-family: var(--font-family-primary);
  resize: none;
  margin: 1rem 0;
  &:focus {
    border: var(--border-purple);
  }
`;

const TextArea = ({ height, width, value, onChange }: InputProps) => {
  return (
    <Styled value={value} onChange={onChange} height={height} width={width} />
  );
};

export default TextArea;
