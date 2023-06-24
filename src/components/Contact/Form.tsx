'use client';

import { sendData } from '@/helpers/fetch';
import { toastPromise } from '@/helpers/toast';
import { themeAtom } from '@/stores/theme';
import LoadingIcon from '../LoadingIcon';

import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { useAtomValue } from 'jotai';
import { FormEvent, useRef, useState } from 'react';
import { z } from 'zod';

type FormError = {
  name?: string;
  email?: string;
  message?: string;
  token?: string;
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

  token: z.string({
    required_error: 'Captcha token is required',
    invalid_type_error: 'Captcha token should be in string',
  }),
});

const NEXT_PUBLIC_TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string;

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [errors, setErrors] = useState<FormError>();
  const isDarkMode = useAtomValue(themeAtom);
  const [isLoading, setIsLoading] = useState(false);

  const captcha = useRef<TurnstileInstance>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const body = formSchema.safeParse({ name, email, message, token });
    if (!body.success) {
      const errs = body.error.issues.map(err => ({
        message: err.message,
        field: err.path[0],
      }));

      return setErrors({
        name: errs.find((err) => err.field === 'name')?.message,
        email: errs.find((err) => err.field === 'email')?.message,
        message: errs.find((err) => err.field === 'message')?.message,
        token: errs.find((err) => err.field === 'token')?.message,
      });
    }

    toastPromise(
      sendData({
        body: JSON.stringify(body.data),
        url: '/api/messages',
        method: 'POST',
        setIsLoading,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      (data) => {
        setName('');
        setEmail('');
        setMessage('');
        return data;
      },
      isDarkMode,
    );

    captcha.current?.reset();
  };

  return (
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors?.name
            && <p className='mt-2 font-medium text-red-100'>{errors.name}</p>}
        </div>
        <div className='w-full'>
          <label
            htmlFor='email'
            className='block mb-2 font-medium text-gray-900 dark:text-white'
          >
            Email
            <span className='ml-1 text-red-100'>*</span>
          </label>
          <input
            type='email'
            id='email'
            className='block p-2.5 w-full text-gray-900 bg-gray-100 rounded-lg border border-gray-300 outline-none dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-100 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-100 dark:focus:border-blue-100'
            placeholder='Your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors?.email
            && <p className='mt-2 font-medium text-red-100'>{errors.email}</p>}
        </div>
      </div>
      <div className='mt-4'>
        <label
          htmlFor='message'
          className='block mb-2 font-medium text-gray-900 dark:text-white'
        >
          Your message
          <span className='ml-1 text-red-100'>*</span>
        </label>
        <textarea
          id='message'
          rows={4}
          className='block p-2.5 w-full text-gray-900 bg-gray-100 rounded-lg border border-gray-300 outline-none dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-100 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-100 dark:focus:border-blue-100'
          placeholder='Write your message here...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        >
        </textarea>
        {errors?.message
          && <p className='mt-2 font-medium text-red-100'>{errors.message}</p>}
      </div>
      <Turnstile
        siteKey={NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        className='mt-4'
        onSuccess={setToken}
        ref={captcha}
        options={{
          theme: isDarkMode ? 'dark' : 'light',
        }}
      />
      <button
        type='submit'
        className='flex items-center py-2.5 px-5 mt-4 mr-2 mb-2 font-medium text-white bg-blue-100 rounded-lg transition duration-300 dark:bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:ring-blue-200 focus:outline-none disabled:cursor-wait dark:hover:bg-blue-200 dark:focus:ring-blue-200'
        disabled={isLoading}
      >
        {isLoading ? <LoadingIcon /> : (
          <>
            Send
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='ml-2 w-4 h-4'
            >
              <path d='M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z' />
            </svg>
          </>
        )}
      </button>
    </form>
  );
};

export default Form;
