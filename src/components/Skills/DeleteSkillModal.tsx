import { themeAtom } from '@/stores/theme';

import { Skill } from '@prisma/client';
import * as Dialog from '@radix-ui/react-dialog';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

type Props = {
  oldData: Skill;
};

const DeleteSkillModal = ({ oldData }: Props) => {
  const [open, setOpen] = useState(false);
  const isDarkMode = useAtomValue(themeAtom);

  const router = useRouter();

  const handleDelete = async (id: string) => {
    toast.promise(sendData(id), {
      loading: 'Loading',
      success: (data) => {
        toggleModal(false);
        router.refresh();

        return data;
      },
      error: (err) => {
        if (err instanceof Error) {
          return err.message;
        }

        return 'Error!';
      },
    }, {
      duration: 5000,
      style: {
        background: isDarkMode ? '#2e2e2e' : '#ebdbb2',
        color: isDarkMode ? '#ebdbb2' : '#2e2e2e',
      },
    });
  };

  const toggleModal = (open: boolean) => {
    setOpen(open);
  };

  const sendData = (id: string) =>
    new Promise<string>(async (ok, err) => {
      try {
        const response = await fetch(`/api/skills/${id}`, {
          method: 'DELETE',
        });
        const result = await response.json();

        if (!response.ok) throw new Error(result.error);

        ok(result.message);
      } catch (error) {
        err(error);
      }
    });

  return (
    <Dialog.Root open={open} onOpenChange={toggleModal}>
      <Dialog.Trigger className='p-3 w-full bg-gradient-to-b from-transparent to-red-100 rounded-br-lg hover:to-red-200'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='mx-auto w-6 h-6'
        >
          <path
            fillRule='evenodd'
            d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z'
            clipRule='evenodd'
          />
        </svg>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 z-50 bg-black/75' />
        <Dialog.Content className='fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-light-bg-primary dark:bg-dark-bg-primary p-[25px] outline-none z-50'>
          <Dialog.Title className='mb-2 text-xl font-medium'>
            Delete {oldData.name} data
          </Dialog.Title>
          <Dialog.Description className='mb-3 text-lg leading-normal dark:text-gray-200 text-light-fg-secondary mt-[10px]'>
            Are you sure want to delete {oldData.name}?
          </Dialog.Description>
          <div>
            <button
              className='py-2.5 px-5 mt-2 mr-2 text-sm font-medium text-white bg-red-100 rounded-lg outline-none dark:bg-red-100 hover:bg-red-200 focus:ring-4 focus:ring-red-200 dark:hover:bg-red-200 dark:focus:ring-red-200'
              onClick={() => handleDelete(oldData.id)}
            >
              Yes, delete it
            </button>
            <button
              className='py-2.5 px-5 mt-2 mr-2 text-sm font-medium text-white bg-gray-100 rounded-lg outline-none dark:bg-gray-800 hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              onClick={() => toggleModal(false)}
            >
              Cancel
            </button>
          </div>
          <Dialog.Close asChild>
            <button
              className='inline-flex absolute justify-center items-center text-green-100 rounded-full appearance-none hover:bg-gray-800 focus:outline-none top-[10px] right-[10px] h-[25px] w-[25px] focus:shadow-gray-800 focus:shadow-[0_0_0_2px]'
              aria-label='Close'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-6 h-6'
              >
                <path
                  fillRule='evenodd'
                  d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteSkillModal;
