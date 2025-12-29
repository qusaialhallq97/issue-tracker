import prisma from '@/prisma/client';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

const IssueForm = dynamic(() => import('../../_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const EditIssuePage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
