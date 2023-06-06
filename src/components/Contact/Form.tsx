'use client';

import { themeAtom } from '@/stores/theme';

import { useAtomValue } from 'jotai';
import { FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';

type FormError = {
  name?: string;
  email?: string;
  message?: string;
};

const formSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name should be in string',
  }).min(3, 'Name should be at least 3 characters'),

  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email should be in string',
  }).email('Email is invalid'),

  message: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email should be in string',
  }).max(256, 'Message should not longer than 256 characters'),
});

type FormBody = z.infer<typeof formSchema>;

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormError>();
  const isDarkMode = useAtomValue(themeAtom);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const body = formSchema.safeParse({ name, email, message });
    if (!body.success) {
      const errs = body.error.issues.map(err => ({
        message: err.message,
        field: err.path[0],
      }));

      return setErrors({
        name: errs.find((err) => err.field === 'name')?.message,
        email: errs.find((err) => err.field === 'email')?.message,
        message: errs.find((err) => err.field === 'message')?.message,
      });
    }

    // sendMessage(body.data);

    try {
      await toast.promise(sendMessage(body.data), {
        loading: 'Loading',
        success: (data) => data.message,
        error: (err) => err.message,
      }, {
        duration: 5000,
        style: {
          background: isDarkMode ? '#2e2e2e' : '#ebdbb2',
          color: isDarkMode ? '#ebdbb2' : '#2e2e2e',
        },
      });

      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = (form: FormBody): Promise<{ message: string }> =>
    new Promise(async (resolve, reject) => {
      const res = await fetch('/api/message', {
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const result = await res.json();
      if (!res.ok) {
        return reject(result);
      }

      resolve(result);
    });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 md:flex-row'>
          <div className='w-full'>
            <label
              htmlFor='name'
              className='block mb-2 font-medium text-gray-900 md:flex-row dark:text-white'
            >
              Name
              <span className='ml-1 text-red-100'>*</span>
            </label>
            <input
              type='text'
              id='name'
              className='block p-2.5 w-full text-gray-900 bg-gray-100 rounded-lg border border-gray-300 outline-none dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-100 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-100 dark:focus:border-blue-100'
              placeholder='Your name'
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors?.name && <p className='mt-2 font-medium text-red-100'>{errors.name}</p>}
          </div>
          <div className='w-full'>
            <label htmlFor='email' className='block mb-2 font-medium text-gray-900 dark:text-white'>
              Email
              <span className='ml-1 text-red-100'>*</span>
            </label>
            <input
              type='email'
              id='email'
              className='block p-2.5 w-full text-gray-900 bg-gray-100 rounded-lg border border-gray-300 outline-none dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-100 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-100 dark:focus:border-blue-100'
              placeholder='Your email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors?.email && <p className='mt-2 font-medium text-red-100'>{errors.email}</p>}
          </div>
        </div>
        <div className='mt-4'>
          <label htmlFor='message' className='block mb-2 font-medium text-gray-900 dark:text-white'>
            Your message
            <span className='ml-1 text-red-100'>*</span>
          </label>
          <textarea
            id='message'
            rows={4}
            className='block p-2.5 w-full text-gray-900 bg-gray-100 rounded-lg border border-gray-300 outline-none dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-100 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-100 dark:focus:border-blue-100'
            placeholder='Write your message here...'
            onChange={(e) => setMessage(e.target.value)}
            required
          >
          </textarea>
          {errors?.message && <p className='mt-2 font-medium text-red-100'>{errors.message}</p>}
        </div>
        <button
          type='submit'
          className='flex items-center py-2.5 px-5 mt-4 mr-2 mb-2 font-medium text-white bg-blue-100 rounded-lg dark:bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:ring-blue-200 focus:outline-none dark:hover:bg-blue-200 dark:focus:ring-blue-200'
        >
          Send
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='ml-2 w-4 h-4'>
            <path d='M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z' />
          </svg>
        </button>
      </form>
      <Toaster
        position='bottom-right'
        reverseOrder={false}
      />
    </>
  );
};

export default Form;
