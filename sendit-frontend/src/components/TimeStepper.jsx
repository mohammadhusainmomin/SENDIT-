import { FiMinus, FiPlus } from "react-icons/fi";
import "./styles/TimeStepper.css";

function TimeStepper({ 
  label, 
  value, 
  onChange, 
  max = 24, 
  step = 1, 
  disabled = false 
}) {
  const handleDecrement = () => {
    const newValue = Math.max(0, parseInt(value) - step);
    onChange(newValue.toString());
  };

  const handleIncrement = () => {
    const newValue = Math.min(max, parseInt(value) + step);
    onChange(newValue.toString());
  };

  const handleInputChange = (e) => {
    let newValue = parseInt(e.target.value) || 0;
    newValue = Math.max(0, Math.min(max, newValue));
    onChange(newValue.toString());
  };

  return (
    <div className="time-stepper-container">
      {label && <label className="time-stepper-label">{label}</label>}
      <div className={`time-stepper ${disabled ? "disabled" : ""}`}>
        <button
          className="stepper-btn stepper-minus"
          onClick={handleDecrement}
          disabled={disabled || parseInt(value) === 0}
          aria-label="Decrease"
          type="button"
        >
          <FiMinus size={20} />
        </button>
        <input
          type="number"
          className="stepper-input"
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          min="0"
          max={max}
          inputMode="numeric"
        />
        <button
          className="stepper-btn stepper-plus"
          onClick={handleIncrement}
          disabled={disabled || parseInt(value) === max}
          aria-label="Increase"
          type="button"
        >
          <FiPlus size={20} />
        </button>
      </div>
    </div>
  );
}

export default TimeStepper;
