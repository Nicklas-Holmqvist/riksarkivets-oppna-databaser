import React from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import NavLink from '../links/NavLink';
import { NavLinksProps } from '../Nav';
import { HamburgerButton } from '../buttons/HamburgerButton';

interface MobileNavigationProps {
  drawer: boolean;
  setDrawer: () => void;
  navLinks: NavLinksProps[];
  path: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  setDrawer,
  drawer,
  navLinks,
  path,
}) => {
  return (
    <>
      <HamburgerButton active={drawer} onClick={setDrawer} />

      {drawer ? (
        <MobileMenu
          variants={motionMobilMenu}
          initial="hidden"
          animate="visible"
        >
          <MobileNav>
            <AnimatePresence>
              {navLinks.map((navLink, index) => (
                <motion.a
                  key={index}
                  variants={motionNavLink}
                  custom={index}
                  onClick={setDrawer}
                >
                  <NavLink
                    href={navLink.href}
                    text={navLink.text}
                    active={path === navLink.path}
                  />
                </motion.a>
              ))}
            </AnimatePresence>
          </MobileNav>
        </MobileMenu>
      ) : null}
    </>
  );
};

export default MobileNavigation;

const motionNavLink = {
  hidden: { opacity: 0, y: -10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.3,
      duration: 0.1,
    },
  }),
};

const motionMobilMenu = {
  hidden: { opacity: 0, margin: '-100%' },
  visible: {
    opacity: 1,
    margin: 0,
    transition: {
      delay: 0.1,
      stiffness: 100,
    },
  },
  exit: { opacity: 0, margin: '-100%' },
};

const MobileNav = styled.nav`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20rem;
  a {
    margin: 1.8rem 0;
    padding-right: 0;
    padding-bottom: 0.5rem;
    font-size: 1rem;
  }
`;

const MobileMenu = styled(motion.aside)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  bottom: 0;
  background: var(--color-white);
  overflow: hidden;
  z-index: 200;
  transition: all;
`;
