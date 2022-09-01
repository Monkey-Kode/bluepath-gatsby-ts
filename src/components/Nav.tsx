import { motion } from 'framer-motion';
import React from 'react';
import { useOnClickOutside } from '../utils/useOnClickOutside';
import BurgerMenu from './BurgerMenu';
import Menu from './Menu';

function Nav({ location }: { location: Location }) {
  const [open, setOpen] = React.useState(false);
  const node = React.useRef<HTMLElement>(null);
  useOnClickOutside(node, () => setOpen(false));
  return (
    <motion.div ref={node as any}>
      <BurgerMenu open={open} setOpen={setOpen} />
      <Menu
        location={location}
        open={open}
        setOpen={setOpen}
        siteLocation="header"
      />
    </motion.div>
  );
}

export default Nav;
