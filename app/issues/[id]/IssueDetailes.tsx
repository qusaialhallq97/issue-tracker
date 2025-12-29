import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import { Card, Flex, Heading } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';

const IssueDetailes = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap='2' my={'2'}>
        <IssueStatusBadge status={issue.Status} />
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card className='prose max-w-full' mt={'4'}>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetailes;
