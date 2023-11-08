import React, { ReactElement } from 'react';

// this link does not support SPA redirect
function Link({ href, children }: { href: string; children: ReactElement }) {
  return <a href={href}>{children}</a>;
}

export default Link;
