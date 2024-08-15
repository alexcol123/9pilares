'use client'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { LuShare2 } from 'react-icons/lu'

import {
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookShareButton
} from 'react-share'

const ShareButton = ({ tagline, productoId, nombre }: { tagline: string, productoId: string, nombre:string }) => {

  const url = process.env.NEXT_PUBLIC_WEBSITE_URL
  const shareLink = `${url}/productos/${productoId}`


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='icon' className='p-2'>
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side='top'
        align='end'
        sideOffset={10}
        className='flex items-center gap-x-2 justify-center w-full'
      >
        <FacebookShareButton url={shareLink} hashtag={tagline}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <TwitterShareButton url={shareLink} title={nombre}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareLink} title={nombre}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <EmailShareButton
        //  url={shareLink} subject={nombre} body={tagline}
        
        onClick={() => {}}
        body={tagline}
        openShareDialogOnClick
        url={shareLink}
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </PopoverContent>
    </Popover>
  )
}
export default ShareButton