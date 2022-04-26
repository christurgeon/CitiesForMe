export default function Footer() {
  return (
    <div className='w-full bg-green-darkest'>
      <div className='xs:flex px-8 py-4 text-white'>
        <div className='xs:w-1/3 xs:text-left text-center sm:text-base text-sm pr-1'>
          <span>Made with ♥ from Troy, NY</span>
        </div>
        <div className='xs:w-1/3 text-center sm:text-base text-sm px-1'>
          <a href='https://github.com/MattCzyr/CitiesForMe'>
            Find us on GitHub
          </a>
        </div>
        <div className='xs:w-1/3 xs:text-right text-center sm:text-base text-sm pl-1'>
          <span>© 2021 CitiesForMe</span>
        </div>
      </div>
    </div>
  )
}
