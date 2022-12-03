import { Logo } from '@icons/Logo';
import { HeaderContainer } from './styles';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />

      {/* {isAuthenticated && (
        <CreditsContainer>
          <CreditsNumber>0</CreditsNumber>
          <Diamond size={13} color={COLORS.SKY_500} weight="fill" />
        </CreditsContainer>
      )} */}
    </HeaderContainer>
  );
}
