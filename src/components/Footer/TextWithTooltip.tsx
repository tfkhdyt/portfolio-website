interface ITextWithTooltip {
  tooltipLabel: string;
  value: number;
}

const TextWithTooltip = ({ tooltipLabel, value }: ITextWithTooltip) => {
  return (
    <span className='tooltip px-1 cursor-pointer' data-tip={tooltipLabel}>
      {value.toLocaleString('id-ID')}
    </span>
  );
};

export default TextWithTooltip;
