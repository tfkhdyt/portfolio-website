import { themeAtom } from '@/stores/theme';

import { Skill, SkillCategory } from '@prisma/client';
import * as Dialog from '@radix-ui/react-dialog';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';

type Props = {
  skillCategories: SkillCategory[];
  currentCategory: SkillCategory;
  oldData: Skill;
};

const UpdateSkillModal = ({ skillCategories, currentCategory, oldData }: Props) => {
  const [open, setOpen] = useState(false);
  const isDarkMode = useAtomValue(themeAtom);

  const [name, setName] = useState(oldData.name);
  const [category, setCategory] = useState<SkillCategory['id']>(oldData.categoryId || currentCategory.id);
  const [photo, setPhoto] = useState<File | null>();

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !category) {
      return;
    }

    const body = new FormData();
    body.append('name', name);
    body.append('category', category);

    if (photo) {
      body.append('photo', photo);
    }

    toast.promise(sendData(body), {
      loading: 'Loading',
      success: (data) => {
        toggleModal(false);
        router.refresh();

        return data;
      },
      error: (err) => err,
    }, {
      duration: 5000,
      style: {
        background: isDarkMode ? '#2e2e2e' : '#ebdbb2',
        color: isDarkMode ? '#ebdbb2' : '#2e2e2e',
      },
    });
  };

  const toggleModal = (open: boolean) => {
    setName(oldData.name);
    setCategory(oldData.categoryId || currentCategory.id);
    setPhoto(null);
    setOpen(open);
  };

  const sendData = (body: FormData) =>
    new Promise<string>(async (ok, err) => {
      try {
        const response = await fetch(`/api/skills/${oldData.id}`, {
          body,
          method: 'PUT',
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
      <Dialog.Trigger className='p-3 w-full bg-gradient-to-b from-transparent to-blue-100 rounded-bl-lg hover:to-blue-200'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='mx-auto w-6 h-6'>
          <path d='M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z' />
          <path d='M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z' />
        </svg>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/75' />
        <Dialog.Content className='fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-light-bg-primary dark:bg-dark-bg-primary p-[25px] outline-none'>
          <Dialog.Title className='mb-2 text-xl font-medium'>Edit {oldData.name} data</Dialog.Title>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className='space-y-6'>
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
                  placeholder='Skill name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {/* {errors?.name && <p className='mt-2 font-medium text-red-100'>{errors.name}</p>} */}
              </div>
              <div className='w-full'>
                <label
                  htmlFor='category'
                  className='block mb-2 font-medium text-gray-900 md:flex-row dark:text-white'
                >
                  Category
                  <span className='ml-1 text-red-100'>*</span>
                </label>
                {skillCategories
                  ? (
                    <select
                      id='category'
                      className='block p-2.5 w-full text-gray-900 bg-gray-100 rounded-lg border border-gray-300 outline-none dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-100 focus:ring-blue-100 dark:focus:ring-blue-100 dark:focus:border-blue-100'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      {skillCategories.map((category) => (
                        <option value={category.id} key={category.id}>{category.name}</option>
                      ))}
                    </select>
                  )
                  : <p>Loading...</p>}
              </div>
              <div>
                <label
                  htmlFor='photo'
                  className='block mb-2 font-medium text-gray-900 md:flex-row dark:text-white'
                >
                  Photo
                </label>
                <input
                  className='block w-full text-gray-900 bg-gray-100 rounded-lg border border-gray-300 cursor-pointer outline-none dark:placeholder-gray-400 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 file:bg-light-bg-secondary file:text-black file:border-0 file:py-2 file:px-3 dark:file:bg-dark-bg-secondary dark:file:text-white'
                  id='photo'
                  type='file'
                  accept='image/*'
                  onChange={(e) => {
                    if (e.target.files) {
                      setPhoto(e.target.files[0]);
                    }
                  }}
                />
              </div>
              <button
                type='submit'
                className='py-2.5 px-5 mt-4 mr-2 mb-2 text-sm font-medium text-white bg-blue-100 rounded-lg dark:bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:ring-blue-200 focus:outline-none dark:hover:bg-blue-200 dark:focus:ring-blue-200'
              >
                Save
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className='inline-flex absolute justify-center items-center text-green-100 rounded-full appearance-none hover:bg-gray-800 focus:outline-none top-[10px] right-[10px] h-[25px] w-[25px] focus:shadow-green-50 focus:shadow-[0_0_0_2px]'
              aria-label='Close'
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
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

export default UpdateSkillModal;
