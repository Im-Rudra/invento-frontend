import { FaShop } from 'react-icons/fa6';
import Container from '../Container';
import { navMenus } from '@/constants';
import Navlink from './Navlink';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-14 items-center">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-4 mr-4">
              <FaShop className="w-6 h-6" />
              <h2 className="text-[24px] font font-semibold uppercase">Invento</h2>
            </div>
            <nav className="flex items-center gap-4 text-sm lg:gap-6">
              {navMenus.map((menu) => (
                <Navlink key={menu.href} href={menu.href}>
                  {menu.name}
                </Navlink>
              ))}
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
}
