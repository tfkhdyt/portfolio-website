import { themeAtom } from '@/stores/theme';

import TechPicker from './TechPicker';

import { ProjectCategory, Skill } from '@prisma/client';
import * as Dialog from '@radix-ui/react-dialog';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import LoadingIcon from '../LoadingIcon';

type Props = {
  projectCategories: ProjectCategory[];
  currentCategory: ProjectCategory;
  skills: Skill[];
};

const CreateProjectModal = ({ projectCategories, currentCategory, skills }: Props) => {
  const [open, setOpen] = useState(false);
  const isDarkMode = useAtomValue(themeAtom);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [photo, setPhoto] = useState<File | null>();
  const [techStack, setTechStack] = useState<string[]>([]);
  const [repoUrl, setRepoUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [category, setCategory] = useState<ProjectCategory['id']>(currentCategory.id);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = new FormData();
    body.append('name', name);
    body.append('desc', desc);
    body.append('photo', photo as File);
    body.append('techStack', JSON.stringify(techStack));
    body.append('repoUrl', repoUrl);
    body.append('demoUrl', demoUrl);
    body.append('category', category);

    toast.promise(sendData(body), {
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
    setName('');
    setDesc('');
    setPhoto(null);
    setTechStack([]);
    setRepoUrl('');
    setDemoUrl('');
    setCategory(currentCategory.id);

    setOpen(open);
  };

  const sendData = (body: FormData) =>
    new Promise<string>(async (ok, err) => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/projects', {
          body,
          method: 'POST',
        });
        const result = await response.json();

        if (!response.ok) throw new Error(result.error);

        ok(result.message);
      } catch (error) {
        err(error);
      } finally {
        setIsLoading(false);
      }
    });

  return (
    <Dialog.Root open={open} onOpenChange={toggleModal}>
      <Dialog.Trigger className='block flex flex-col items-center py-6 space-y-2 bg-white rounded-lg border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 group dark:hover:bg-gray-700'>
        <div className='m-auto'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-16 h-16'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 z-50 bg-black/75' />
        <Dialog.Content className='fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[900px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-light-bg-primary dark:bg-dark-bg-primary p-[25px] outline-none z-50 overflow-y-auto'>
          <Dialog.Title className='mb-2 text-xl font-medium'>Add new project</Dialog.Title>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className='flex flex-col gap-6 md:flex-row'>
              <div className='space-y-6 md:w-3/6'>
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
                    placeholder='Project name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  {/* {errors?.name && <p className='mt-2 font-medium text-red-100'>{errors.name}</p>} */}
                </div>
                <div className='w-full'>
                  <label
                    htmlFor='description'
                    className='block mb-2 font-medium text-gray-900 md:flex-row dark:text-white'
                  >
                    Description
                    <span className='ml-1 text-red-100'>*</span>
                  </label>
                  <textarea
                    id='description'
                    rows={4}
                    className='block p-2.5 w-full text-gray-900 bg-gray-100 rounded-lg border border-gray-300 outline-none dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-100 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-100 dark:focus:border-blue-100'
                    placeholder='Project description'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                  >
                  </textarea>
                </div>
                <div className='w-full'>
                  <label
                    htmlFor='photo'
                    className='block mb-2 font-medium text-gray-900 md:flex-row dark:text-white'
                  >
                    Photo
                    <span className='ml-1 text-red-100'>*</span>
                  </label>
                  <input
                    className='block w-full text-gray-900 bg-gray-100 rounded-lg border border-gray-300 cursor-pointer outline-none dark:placeholder-gray-400 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 file:bg-gray-200 file:text-black file:border-0 file:py-2 file:px-3 dark:file:bg-dark-bg-secondary dark:file:text-white'
                    id='photo'
                    type='file'
                    accept='image/*'
                    onChange={(e) => {
                      if (e.target.files) {
                        setPhoto(e.target.files[0]);
                      }
                    }}
                    required
                  />
                </div>
                <div className='w-full'>
                  <label
                    htmlFor='repoUrl'
                    className='block mb-2 font-medium text-gray-900 md:flex-row dark:text-white'
                  >
                    Repository URL
                  </label>
                  <input
                    type='url'
                    id='repoUrl'
                    className='block p-2.5 w-full text-gray-900 bg-gray-100 rounded-lg border border-gray-300 outline-none dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-100 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-100 dark:focus:border-blue-100'
                    placeholder='Repository URL'
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                  />
                </div>
                <div className='w-full'>
                  <label
                    htmlFor='demoUrl'
                    className='block mb-2 font-medium text-gray-900 md:flex-row dark:text-white'
                  >
                    Demo URL
                  </label>
                  <input
                    type='url'
                    id='demoUrl'
                    className='block p-2.5 w-full text-gray-900 bg-gray-100 rounded-lg border border-gray-300 outline-none dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-100 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-100 dark:focus:border-blue-100'
                    placeholder='Demo URL'
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                  />
                </div>
                <div className='w-full'>
                  <label
                    htmlFor='category'
                    className='block mb-2 font-medium text-gray-900 md:flex-row dark:text-white'
                  >
                    Category
                    <span className='ml-1 text-red-100'>*</span>
                  </label>
                  <select
                    id='category'
                    className='block p-2.5 w-32 text-gray-900 bg-gray-100 rounded-lg border border-gray-300 outline-none dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-100 focus:ring-blue-100 dark:focus:ring-blue-100 dark:focus:border-blue-100'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    {projectCategories.map((ctgry) => <option value={ctgry.id} key={ctgry.id}>{ctgry.name}</option>)}
                  </select>
                </div>
              </div>
              <div className='space-y-6 md:w-3/6'>
                <TechPicker
                  techStack={techStack}
                  setTechStack={setTechStack}
                  skills={skills}
                />
              </div>
            </div>
            <button
              type='submit'
              className='py-2.5 px-5 mt-6 mr-2 mb-2 text-sm font-medium text-white bg-blue-100 rounded-lg dark:bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:ring-blue-200 focus:outline-none disabled:cursor-wait dark:hover:bg-blue-200 dark:focus:ring-blue-200'
              disabled={isLoading}
            >
              {isLoading ? <LoadingIcon /> : 'Save'}
            </button>
          </form>
          <Dialog.Close asChild>
            <button
              className='inline-flex absolute justify-center items-center text-green-100 rounded-full appearance-none hover:bg-gray-800 focus:outline-none top-[10px] right-[10px] h-[25px] w-[25px] focus:shadow-gray-800 focus:shadow-[0_0_0_2px]'
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

export default CreateProjectModal;
