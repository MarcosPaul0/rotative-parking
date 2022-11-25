import styled, { css } from 'styled-components/native';

export const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
`;

export const ContentContainer = styled.ScrollView`
  width: 100%;
  max-height: 100%;
  border-radius: 10px;
`;

interface ModalTextStyle {
  type: 'text' | 'title';
}

const TEXT_TYPE = {
  text: 'REGULAR',
  title: 'BOLD',
} as const;

const FONT_SIZE = {
  text: 'LG',
  title: 'XLG',
} as const;

export const ModalText = styled.Text<ModalTextStyle>`
  ${({ theme, type }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE[FONT_SIZE[type]]};
    font-family: ${theme.FONTS[TEXT_TYPE[type]]};
    margin-bottom: 10px;
    width: 100%;
    text-align: center;
  `}
`;
