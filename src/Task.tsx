import { useRef } from "react";
import "./Task.css";

const CARD_REGEX = /^\d{4} \d{4} \d{4} \d{4}$/;
const MONTH_REGEX = /^(0[1-9]|1[0-2])$/;
const YEAR_REGEX = /^\d{2}$/;
const CVC_REGEX = /^\d{3}$/;

const CardForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const cvcRef = useRef<HTMLInputElement>(null);
  const mmRef = useRef<HTMLInputElement>(null);
  const yyRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const name = nameRef.current?.value.trim() || "";
    const number = numberRef.current?.value || "";
    const cvc = cvcRef.current?.value || "";
    const mm = mmRef.current?.value || "";
    const yy = yyRef.current?.value || "";

    if (!name) {
      alert("Name cannot be empty!");
      nameRef.current?.focus();
      return;
    }

    if (!CARD_REGEX.test(number)) {
      alert("Card number invalid! Use 0000 0000 0000 0000");
      numberRef.current?.focus();
      return;
    }

    if (!MONTH_REGEX.test(mm)) {
      alert("Month invalid! Use 01-12");
      mmRef.current?.focus();
      return;
    }

    if (!YEAR_REGEX.test(yy)) {
      alert("Year invalid! Use 2-digit year");
      yyRef.current?.focus();
      return;
    }

    if (!CVC_REGEX.test(cvc)) {
      alert("CVC invalid! Use 3 digits");
      cvcRef.current?.focus();
      return;
    }

    const data = { name, number, cvc, mm, yy };
    localStorage.setItem("cardData", JSON.stringify(data));
  };

  return (
    <div>
      <input ref={nameRef} placeholder="Cardholder Name" />
      <input ref={numberRef} placeholder="Card Number" maxLength={19} />
      <input ref={cvcRef} placeholder="CVC" maxLength={3} />
      <input ref={mmRef} placeholder="MM" maxLength={2} />
      <input ref={yyRef} placeholder="YY" maxLength={2} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default CardForm;
