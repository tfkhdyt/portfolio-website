import { themeAtom } from '@/stores/theme';
import SaveButton from '../Buttons/SaveButton';
import CategoryPicker from '../Inputs/CategoryPicker';
import Input from '../Inputs/Input';
import InputImage from '../Inputs/InputImage';
import Modal from '../Modal';

import { sendData } from '@/helpers/fetch';
import { toastPromise } from '@/helpers/toast';
import { SkillCategory } from '@prisma/client';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

type Props = {
  skillCategories: SkillCategory[];
  currentCategory: SkillCategory;
};

const CreateSkillModal = ({ skillCategories, currentCategory }: Props) => {
  const [open, setOpen] = useState(false);
  const isDarkMode = useAtomValue(themeAtom);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<SkillCategory['id']>(currentCategory.id);
  const [photo, setPhoto] = useState<File | null>();

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !category || !photo) {
      return;
    }

    const body = new FormData();
    body.append('name', name);
    body.append('category', category);
    body.append('photo', photo);

    toastPromise(
      sendData({
        body,
        url: '/api/skills',
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
    setCategory(currentCategory.id);
    setPhoto(null);
    setOpen(open);
  };

  return (
    <Modal
      open={open}
      onOpenChange={toggleModal}
      size='sm'
      title='Add new skill'
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
      <form onSubmit={handleSubmit}>
        <div className='space-y-6'>
          <Input
            name='Name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder='Skill name'
          />
          <CategoryPicker
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            categories={skillCategories}
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
          <SaveButton isLoading={isLoading} />
        </div>
      </form>
    </Modal>
  );
};

export default CreateSkillModal;
