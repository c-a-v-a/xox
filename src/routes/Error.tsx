function Error() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-10">
      <h1 className="max-w-3/4 text-2xl sm:text-5xl text-red-500 font-bold mb-5">Ooops! Error has occured.</h1>
      <h2 className="max-w-3/4 text-xl sm:text-2xl text-white font-bold">This route doesn't exist. Try going back and using a different route.</h2>
    </div>
  ); 
}

export default Error;