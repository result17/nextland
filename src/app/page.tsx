import Intro from '@/components/Intro'
import ShortUrlBtn from '@/components/ShortUrlBtn'
import ShortUrlInput from '@/components/ShortUrlInput'
import './globals.css'

export default function Home() {
  return (
    <main className='flex w-screen-xl min-h-screen flex-col items-center py-60'>
      <Intro />
      <div className='flex w-full py-10'>
        <ShortUrlInput />
        <ShortUrlBtn>shorten url</ShortUrlBtn>
      </div>
    </main>
  )
}