import RegisterForm from '../../components/RegisterForm';

const Page = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-4">
      <h1 className="text-4xl font-bold mb-12">Register</h1>
      <RegisterForm />
      <div className="border-b border-gray-300 my-4"></div>
      <div className="flex w-[25vw] items-center justify-center p-3 m-2 bg-gray-900 rounded-lg cursor-pointer">
        <span className="text-white">Continue with Google</span>
      </div>
      <div className="flex w-[25vw] items-center justify-center p-3 bg-gray-900 rounded-lg cursor-pointer">
        <span className="text-white">Continue with Apple</span>
      </div>
    </div>
  );
};

export default Page;
