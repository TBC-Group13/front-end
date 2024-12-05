export default function Profile() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-screen-xl rounded-lg bg-white p-6 shadow-lg md:p-8 lg:p-10 xl:p-12 2xl:p-14">
        <h1 className="self-start text-xl font-bold md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
          Profile
        </h1>

        <div className="relative mx-auto my-10 flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-full bg-gray-300 md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px] xl:h-[220px] xl:w-[220px] 2xl:h-[250px] 2xl:w-[250px]">
          <img
            src="https://via.placeholder.com/120"
            alt="Profile"
            className="h-full w-full object-cover"
          />
          <img
            className="absolute right-2 top-2 h-8 w-8 cursor-pointer xl:h-10 xl:w-10 2xl:h-12 2xl:w-12"
            src="/icons/camera.svg"
            alt="Camera Icon"
          />
        </div>

        <div className="mb-10 text-center">
          <h1 className="mt-4 text-lg font-semibold md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
            Shawn Howard
          </h1>
          <p className="text-sm text-gray-500 md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
            shawn_howard@gmail.com
          </p>
        </div>

        <div className="mt-6 w-full space-y-6">
          <h2 className="text-center text-[1.4rem] font-semibold text-gray-400 md:text-[1.6rem] lg:text-[1.8rem] xl:text-[2rem] 2xl:text-[2.2rem]">
            INFORMATION
          </h2>
          <div className="flex justify-between border-b border-gray-300 py-5 text-gray-700">
            <span className="text-[1.4rem] text-gray-400 md:text-[1.6rem] lg:text-[1.8rem] xl:text-[2rem] 2xl:text-[2.2rem]">
              Score
            </span>
            <span className="font-semibold text-gray-600 md:text-[1.6rem] lg:text-[1.8rem] xl:text-[2rem] 2xl:text-[2.2rem]">
              25
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-300 py-5 text-gray-700">
            <span className="text-[1.4rem] text-gray-400 md:text-[1.6rem] lg:text-[1.8rem] xl:text-[2rem] 2xl:text-[2.2rem]">
              Answered Questions
            </span>
            <span className="font-semibold text-gray-600 md:text-[1.6rem] lg:text-[1.8rem] xl:text-[2rem] 2xl:text-[2.2rem]">
              15
            </span>
          </div>

          <div className="py-5">
            <div className="border-b border-gray-300 py-5">
              <button className="flex items-center text-gray-500 hover:text-gray-700">
                <span>
                  <img
                    src="/icons/logout.svg"
                    alt="Log Out Icon"
                    className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14"
                  />
                </span>
                <span className="ml-3 text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem] xl:text-[2rem] 2xl:text-[2.2rem]">
                  Log Out
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
