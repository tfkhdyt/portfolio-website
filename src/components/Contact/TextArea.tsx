import { IInputForm } from '.';

const TextArea = ({ label, name, ...rest }: IInputForm) => {
  return (
    <>
      <label
        className='relative block p-3 border-2 border-base-content/25 rounded-lg bg-base-100'
        htmlFor={name}
      >
        <span className='text-xs font-medium text-base-content/60'>
          {label}
        </span>

        <textarea
          className='w-full p-0 text-sm border-none focus:ring-0 text-base-content bg-base-100 resize-none outline-none placeholder-base-content/75'
          id={name}
          required
          {...rest}
        ></textarea>
      </label>
      {/* <label
        className='relative block p-3 border-2 border-base-300 rounded-lg bg-base-100'
        htmlFor={name}
      >
        <textarea
          className='w-full px-0 pt-3.5 pb-0 text-sm placeholder-transparent border-none focus:ring-0 peer bg-base-100 text-base-content/90 resize-none'
          id={name}
          required
          {...rest}
        ></textarea>

        <span className='absolute text-xs font-medium text-base-content/60 transition-all left-3 peer-focus:text-xs peer-focus:top-3 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm'>
          {label}
        </span>
      </label> */}
    </>
  );
  /* return (
    <div className='form-control'>
      <label className='label pt-0'>
        <span className='label-text font-bold text-base-100'>{label}</span>
      </label>
      <textarea
        name={name}
        className='textarea textarea-bordered h-24 resize-none font-medium text-base-content/90'
        required
        {...rest}
      ></textarea>
    </div>
  ); */
};

export default TextArea;
