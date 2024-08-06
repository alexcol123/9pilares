import { GiPointySword } from "react-icons/gi";
import { SiFireship } from "react-icons/si";


import Link from "next/link";
import { Button } from "@/components/ui/button";


const siteName = process.env.SITE_NAME
// remove first letter of siteName

//const name = siteName?.slice(-1)

const Logo = () => {
  return (

    <Button size={'default'} asChild >
      <Link href='/' className="flex  items-center justify-center gap-2">

        <p className=" tracking-wider text-lg ">{siteName?.substring(0, 1)}
          <span className="opacity-90 text-secondary-foreground ml-0.5">{siteName?.substring(1)}</span>
        </p>



        <SiFireship size={23}  />

      </Link>

    </Button>
  )
}
export default Logo