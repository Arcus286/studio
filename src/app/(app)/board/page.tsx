'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PROJECTS } from '@/lib/data';
import Loading from '@/app/loading';

export default function BoardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    if (PROJECTS.length > 0) {
      router.replace(`/projects/${PROJECTS[0].id}/board`);
    } else {
      router.replace('/projects');
    }
  }, [router]);

  return <Loading />;
}
