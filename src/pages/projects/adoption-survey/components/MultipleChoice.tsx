import Button from "component/utility/Button";
import Fieldset from "component/utility/Fieldset";
import Radio from "component/utility/Radio";

export default function MultipleChoice() {
  return (
    <Fieldset legend="what was the difference between 1st and 2nd place for most adoptable?">
      <Radio name="most" value="6" label="6 votes" id="6" />
      <Radio name="most" value="11" label="11 votes" id="11" />
      <Radio name="most" value="26" label="26 votes" id="26" />
      <Radio name="most" value="31" label="31 votes" id="31" />
      <Button value="check!" />
    </Fieldset>
  );
}
