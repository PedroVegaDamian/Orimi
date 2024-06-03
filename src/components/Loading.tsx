import LogoLoading from '@/assets/loading.gif'

export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-dvh pb-[149px]">
      <img src={LogoLoading} alt="loading"  className='h-44'/>
    </div>
  )
}
