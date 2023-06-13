import { themeAtom } from '@/stores/theme';

import { Project, ProjectCategory, Skill } from '@prisma/client';
import * as Dialog from '@radix-ui/react-dialog';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import LoadingIcon from '../LoadingIcon';
import TechPicker from './TechPicker';

type Props = {
  projectCategories: ProjectCategory[];
  currentCategory: ProjectCategory;
  oldData: Project & {
    techStack: Skill[];
  };
  skills: Skill[];
};

const UpdateProjectModal = ({ projectCategories, currentCategory, oldData, skills }: Props) => {
  const [open, setOpen] = useState(false);
  const isDarkMode = useAtomValue(themeAtom);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(oldData.name);
  const [desc, setDesc] = useState(oldData.desc);
  const [photo, setPhoto] = useState<File | null>();
  const [techStack, setTechStack] = useState<string[]>(oldData.techStack.map((tech) => tech.id));
  const [repoUrl, setRepoUrl] = useState(oldData.repoUrl ?? '');
  const [demoUrl, setDemoUrl] = useState(oldData.demoUrl ?? '');
  const [category, setCategory] = useState<ProjectCategory['id']>(oldData.categoryId ?? currentCategory.id);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = new FormData();
    body.append('name', name);
    body.append('desc', desc);
    body.append('techStack', JSON.stringify(techStack));
    body.append('category', category);
    body.append('repoUrl', repoUrl);
    body.append('demoUrl', demoUrl);

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
      error: (err) => {
        if (err instanceof Error) {
          console.log(err.message);
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
    setName(oldData.name);
    setDesc(oldData.desc);
    setPhoto(null);
    setTechStack(oldData.techStack.map((tech) => tech.id));
    setRepoUrl(oldData.repoUrl ?? '');
    setDemoUrl(oldData.demoUrl ?? '');
    setCategory(oldData.categoryId ?? currentCategory.id);

    setOpen(open);
  };

  const sendData = (body: FormData) =>
    new Promise<string>(async (ok, err) => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/projects/${oldData.id}`, {
          body,
          method: 'PUT',
        });
        const result = await response.json();

        if (!response.ok) throw new Error(result.error);

        ok(result.message);
      } catch (error) {
        console.log(error);
        err(error);
      } finally {
        setIsLoading(false);
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
        <Dialog.Overlay className='fixed inset-0 z-50 bg-black/75' />
        <Dialog.Content className='fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[900px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-light-bg-primary dark:bg-dark-bg-primary p-[25px] outline-none z-50 overflow-y-auto'>
          <Dialog.Title className='mb-2 text-xl font-medium'>Edit {oldData.name} data</Dialog.Title>
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

export default UpdateProjectModal;
