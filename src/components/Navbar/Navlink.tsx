'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  href: string;
  prefetch?: boolean;
  children: ReactNode;
}

export default function Navlink({ children, href, prefetch = true }: Props) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        'transition-colors hover:text-foreground/80',
        pathname?.startsWith(href) ? 'text-foreground' : 'text-foreground/60'
      )}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
}
