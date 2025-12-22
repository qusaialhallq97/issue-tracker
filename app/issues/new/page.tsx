'use client';
import axios from 'axios';
import { Button, Callout, TextArea, TextField } from '@radix-ui/themes';
import { set, useForm } from 'react-hook-form';
import React from 'react';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = React.useState('');
  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root className='text-red-500 mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className='space-y-4'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError('Failed to create issue. Please try again.');
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <TextArea placeholder='Description' {...register('description')} />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
