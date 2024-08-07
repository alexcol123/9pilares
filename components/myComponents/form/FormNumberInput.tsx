import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



type PriceInputProps = {
  defaultValue?: number,
  name: string,
  labelName: string
  required?: boolean
}

const FormNumberInput = ({ defaultValue, name, labelName, required = true }: PriceInputProps) => {



  return (
    <div className="mb-2 ">
      <Label
        htmlFor={name}
        className="capitalize" >
        {labelName || name}
      </Label>
      <Input
        type="number"
        id={name}
        name={name}
        min={0}
        defaultValue={defaultValue}
        placeholder="30"
        className="mt-1 "
        required={required}
      />
    </div>
  )
}
export default FormNumberInput