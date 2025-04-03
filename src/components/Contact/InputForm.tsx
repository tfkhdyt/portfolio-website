import { IInputForm } from '.';

const InputForm = ({ label, name, type = 'text', ...rest }: IInputForm) => {
  return (
    <label
      className='relative block p-3 border-2 border-base-content/25 rounded-lg bg-base-100'
      htmlFor={name}
    >
      <input
        className='w-full px-0 pt-3.5 pb-0 text-sm placeholder-transparent border-none focus:ring-0 peer bg-base-100 text-base-content/90 outline-none'
        id={name}
        type={type}
        required
        {...rest}
      />

      <span className='absolute text-xs font-medium text-base-content/60 transition-all left-3 peer-focus:text-xs peer-focus:top-3 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm'>
        {label}
      </span>
    </label>
  );
  /* return (
    <div className='form-control'>
      <label className='label pt-0'>
        <span className='label-text font-bold text-base-100'>{label}</span>
      </label>
      <input
        type={type}
        name={name}
        className='input input-bordered w-full font-medium text-base-content/90'
        required
        {...rest}
      />
    </div>
  ); */
};
export default InputForm;
