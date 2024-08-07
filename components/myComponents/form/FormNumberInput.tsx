import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



type PriceInputProps = {
  defaultValue?: number,
  name: string,
  labelName: string
}

const FormNumberInput = ({ defaultValue, name , labelName}: PriceInputProps) => {



  return (
    <div className="mb-2 ">
      <Label
        htmlFor={name}
        className="capitalize" >
        {labelName ||name}
      </Label>
      <Input
        type="number"
        id={name}
        name={name}
        min={0}
        defaultValue={defaultValue}
        placeholder="29"
        className="mt-1 "
        required />
    </div>
  )
}
export default FormNumberInput