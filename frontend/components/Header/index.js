import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import Nav from "../Nav";
import { Container, Logo, BarContainer } from "./styles";
import Cart from '../Cart.js';
import Search from '../Search';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

export default function Header() {
  return (
    <Container>
      <Logo>
        <Link href="/">
          <a>.thriftstore.</a>
        </Link>
      </Logo>
      <BarContainer>
        <Search />
        <Nav />
      </BarContainer>
      <Cart />
    </Container >
  );
}