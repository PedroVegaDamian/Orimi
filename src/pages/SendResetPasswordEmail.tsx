const SendRestePasswordEmailPage = () => {
  return (
    <>
      <div className=" flex justify-center items-center w-full mt-10">
        <div className="p-4 w-full max-w-md h-full">
          <div className="p-4 text-center  bg-white_color rounded-lg shadow ">
            <h1 className="text-2xl font-medium text-center text-primary_800_color">
              We have sent you an email!
            </h1>
            <p className="text-sm pt-5">
              An email with instructions to reset your password has been sent to
              your email address. Check your spam folder
            </p>
            <div className="gap-3 mt-8"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SendRestePasswordEmailPage
