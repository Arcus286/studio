
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import { useSharedState } from '@/hooks/use-shared-state';

export default function BoardRedirectPage() {
  const router = useRouter();
  const { projects } = useSharedState();

  useEffect(() => {
    if (projects.length > 0) {
      router.replace(`/projects/${projects[0].id}/board`);
    } else {
      router.replace('/projects');
    }
  }, [router, projects]);

  return <Loading />;
}
