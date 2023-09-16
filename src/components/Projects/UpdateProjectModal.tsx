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
  currentCategory: string;
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
    oldData.category?.name ?? currentCategory,
  );

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const categoryId = projectCategories.filter(
      (cat) => cat.name === category,
    )[0].id;

    const body = new FormData();
    body.append('name', name);
    body.append('desc', desc);
    body.append('techStack', JSON.stringify(techStack));
    body.append('category', categoryId);
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
    setCategory(oldData.category?.name ?? currentCategory);

    setOpen(open);
  };

  return (
    <Modal
      title={`Edit ${oldData.name} data`}
      open={open}
      onOpenChange={toggleModal}
      size="md"
      triggerContainerClassNames="p-3 w-full bg-gradient-to-b from-transparent to-blue-100 rounded-bl-lg hover:to-blue-200"
      trigger={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mx-auto w-6 h-6"
        >
          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
          <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
        </svg>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="space-y-6 md:w-3/6">
            <Input
              type="text"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project name"
              required
            />
            <Input
              type="textarea"
              name="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Project description"
              required
            />
            <InputImage
              name="Photo"
              onChange={(e) => {
                if (e.target.files) {
                  setPhoto(e.target.files[0]);
                }
              }}
            />
            <Input
              name="Repository URL"
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="Repository URL"
            />
            <Input
              name="Demo URL"
              type="url"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              placeholder="Demo URL"
            />
            <CategoryPicker
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              categories={projectCategories}
            />
          </div>
          <div className="space-y-6 md:w-3/6">
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
