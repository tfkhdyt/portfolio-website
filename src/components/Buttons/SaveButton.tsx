import LoadingIcon from '../LoadingIcon';

type Props = {
  isLoading: boolean;
};

const SaveButton = ({ isLoading = false }: Props) => {
  return (
    <button
      type='submit'
      className='py-2.5 px-5 mt-6 mr-2 mb-2 text-sm font-medium text-white bg-blue-100 rounded-lg dark:bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:ring-blue-200 focus:outline-none disabled:cursor-wait dark:hover:bg-blue-200 dark:focus:ring-blue-200'
      disabled={isLoading}
    >
      {isLoading ? <LoadingIcon /> : 'Save'}
    </button>
  );
};

export default SaveButton;
