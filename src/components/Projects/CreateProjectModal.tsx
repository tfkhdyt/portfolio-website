import { sendData } from '@/helpers/fetch';
import { toastPromise } from '@/helpers/toast';
import { themeAtom } from '@/stores/theme';
import SaveButton from '../Buttons/SaveButton';
import CategoryPicker from '../Inputs/CategoryPicker';
import Input from '../Inputs/Input';
import InputImage from '../Inputs/InputImage';
import Modal from '../Modal';
import TechPicker from './TechPicker';

import { ProjectCategory, Skill } from '@prisma/client';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';

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

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const body = new FormData();
    body.append('name', name);
    body.append('desc', desc);
    body.append('photo', photo as File);
    body.append('techStack', JSON.stringify(techStack));
    body.append('repoUrl', repoUrl);
    body.append('demoUrl', demoUrl);
    body.append('category', category);

    toastPromise(
      sendData({
        url: '/api/projects',
        body,
        method: 'POST',
        setIsLoading,
      }),
      (data) => {
        toggleModal(false);
        router.refresh();
        return data;
      },
      isDarkMode,
    );
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

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title='Create new project'
      triggerContainerClassNames='block flex flex-col items-center py-6 space-y-2 bg-white rounded-lg border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 group dark:hover:bg-gray-700'
      trigger={
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
      }
    >
      <form>
        <div className='flex flex-col gap-6 md:flex-row'>
          <div className='space-y-6 md:w-3/6'>
            <Input
              type='text'
              name='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Project name'
              required
            />
            <Input
              type='textarea'
              name='Description'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder='Project description'
              required
            />
            <InputImage
              name='Photo'
              onChange={(e) => {
                if (e.target.files) {
                  setPhoto(e.target.files[0]);
                }
              }}
              required
            />
            <Input
              name='Repository URL'
              type='url'
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder='Repository URL'
            />
            <Input
              name='Demo URL'
              type='url'
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              placeholder='Demo URL'
            />
            <CategoryPicker
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              categories={projectCategories}
            />
          </div>
          <div className='space-y-6 md:w-3/6'>
            <TechPicker
              techStack={techStack}
              setTechStack={setTechStack}
              skills={skills}
            />
          </div>
        </div>
        <SaveButton isLoading={isLoading} onClick={handleSubmit} />
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
