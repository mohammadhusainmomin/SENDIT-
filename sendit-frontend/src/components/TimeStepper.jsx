import { FiMinus, FiPlus } from "react-icons/fi";

function TimeStepper({
  label,
  value,
  onChange,
  max = 24,
  step = 1,
  disabled = false,
}) {
  const handleDecrement = () => {
    const newValue = Math.max(0, parseInt(value, 10) - step);
    onChange(newValue.toString());
  };

  const handleIncrement = () => {
    const newValue = Math.min(max, parseInt(value, 10) + step);
    onChange(newValue.toString());
  };

  const handleInputChange = (e) => {
    let newValue = parseInt(e.target.value, 10) || 0;
    newValue = Math.max(0, Math.min(max, newValue));
    onChange(newValue.toString());
  };

  return (
    <div>
      {label ? <label className="si-meta-label" style={{ display: "block", marginBottom: "0.45rem" }}>{label}</label> : null}
      <div className="stepper-redesign">
        <button onClick={handleDecrement} disabled={disabled || parseInt(value, 10) === 0} aria-label="Decrease" type="button">
          <FiMinus />
        </button>
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          min="0"
          max={max}
          inputMode="numeric"
        />
        <button onClick={handleIncrement} disabled={disabled || parseInt(value, 10) === max} aria-label="Increase" type="button">
          <FiPlus />
        </button>
      </div>
    </div>
  );
}

export default TimeStepper;
