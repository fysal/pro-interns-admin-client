const ChipsForm = ({
  label,
  id,
  list,
  placeholder,
  onChange,
  description,
  onChipDelete,
  chipRef,
}) => {
  return (
    <>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <div className="chip_wrapper p-3">
        <div className="d-flex align-items-center flex-wrap">
          {list?.map((item, index) => (
            <span
              key={index}
              onClick={() => onChipDelete(item)}
              className="chip d-flex align-items-center justify-content-between mb-3 pointer"
            >
              <span className="">{item}</span>
              <span className="material-icons-outlined small ms-2">
                highlight_off
              </span>
            </span>
          ))}
        </div>

        <input
          id={id}
          type="text"
          className="chip_form"
          placeholder={placeholder}
          ref={chipRef}
          onChange={(e)=>onChange(e)}
        />
        <span className="small text-muted fst-italic">{description}</span>
      </div>
    </>
  );
};

export default ChipsForm;
