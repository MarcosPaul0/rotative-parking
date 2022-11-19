import Svg, { Path } from 'react-native-svg';
import { HeaderContainer } from './styles';

export function Header() {
  return (
    <HeaderContainer>
      <Svg width={41.25} height={45} viewBox="0 0 55 60" fill="none">
        <Path
          d="M50 24.2308C50 41.5385 27.5 55 27.5 55C27.5 55 5 41.5385 5 24.2308C5 19.1305 7.37053 14.239 11.5901 10.6326C15.8097 7.02609 21.5326 5 27.5 5C33.4674 5 39.1903 7.02609 43.4099 10.6326C47.6295 14.239 50 19.1305 50 24.2308Z"
          fill="#F1F1F1"
          stroke="#EB3238"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M24.3185 24.5521H35.3783V28.7536H24.3185V24.5521ZM24.7949 32.3873H37.25V36.7307H18.125V16.8589H36.8076V21.2023H24.7949V32.3873Z"
          fill="black"
        />
      </Svg>
    </HeaderContainer>
  );
}
