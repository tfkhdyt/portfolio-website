import { ProjectWithTechStack } from '@/domains/project/ProjectDto';
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
import { FormEvent, useState } from 'react';

type Props = {
  projectCategories: ProjectCategory[];
  currentCategory: ProjectCategory;
  oldData: ProjectWithTechStack;
  skills: Skill[];
};

const UpdateProjectModal = ({
  projectCategories,
  currentCategory,
  oldData,
  skills,
}: Props) => {
  const [open, setOpen] = useState(false);
  const isDarkMode = useAtomValue(themeAtom);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(oldData.name);
  const [desc, setDesc] = useState(oldData.desc);
  const [photo, setPhoto] = useState<File | null>();
  const [techStack, setTechStack] = useState<string[]>(
    oldData.techStack.map((tech) => tech.id),
  );
  const [repoUrl, setRepoUrl] = useState(oldData.repoUrl ?? '');
  const [demoUrl, setDemoUrl] = useState(oldData.demoUrl ?? '');
  const [category, setCategory] = useState<ProjectCategory['id']>(
    oldData.categoryId ?? currentCategory.id,
  );

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

    toastPromise(
      sendData({
        url: `/api/projects/${oldData.id}`,
        method: 'PUT',
        setIsLoading,
        body,
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
    setDesc(oldData.desc);
    setPhoto(null);
    setTechStack(oldData.techStack.map((tech) => tech.id));
    setRepoUrl(oldData.repoUrl ?? '');
    setDemoUrl(oldData.demoUrl ?? '');
    setCategory(oldData.categoryId ?? currentCategory.id);

    setOpen(open);
  };

  return (
    <Modal title={`Edit ${oldData.name} data`} open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
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
        <SaveButton isLoading={isLoading} />
      </form>
    </Modal>
  );
};

export default UpdateProjectModal;
