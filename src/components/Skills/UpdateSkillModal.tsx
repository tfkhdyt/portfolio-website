import { sendData } from '@/helpers/fetch';
import { toastPromise } from '@/helpers/toast';
import { themeAtom } from '@/stores/theme';
import SaveButton from '../Buttons/SaveButton';
import CategoryPicker from '../Inputs/CategoryPicker';
import Input from '../Inputs/Input';
import InputImage from '../Inputs/InputImage';
import Modal from '../Modal';

import { Skill, SkillCategory } from '@prisma/client';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

type Props = {
  skillCategories: SkillCategory[];
  currentCategory: SkillCategory;
  oldData: Skill;
};

const UpdateSkillModal = ({ skillCategories, currentCategory, oldData }: Props) => {
  const [open, setOpen] = useState(false);
  const isDarkMode = useAtomValue(themeAtom);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [name, setName] = useState(oldData.name);
  const [category, setCategory] = useState<SkillCategory['id']>(
    oldData.categoryId ?? currentCategory.id,
  );
  const [photo, setPhoto] = useState<File | null>();

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

    toastPromise(
      sendData({
        url: `/api/skills/${oldData.id}`,
        body,
        method: 'PUT',
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
    setName(oldData.name);
    setCategory(oldData.categoryId ?? currentCategory.id);
    setPhoto(null);
    setOpen(open);
  };

  return (
    <Modal
      open={open}
      onOpenChange={toggleModal}
      title={`Edit ${oldData.name} skill`}
      size='sm'
      triggerContainerClassNames='p-3 w-full bg-gradient-to-b from-transparent to-blue-100 rounded-bl-lg hover:to-blue-200'
      trigger={
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='mx-auto w-6 h-6'
        >
          <path d='M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z' />
          <path d='M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z' />
        </svg>
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
          />
          <SaveButton isLoading={isLoading} />
        </div>
      </form>
    </Modal>
  );
};

export default UpdateSkillModal;
