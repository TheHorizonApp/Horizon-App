import RegisterForm from "../../components/RegisterForm";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black dark:text-white dark:bg-black px-4 py-10">
      <h1 className="text-4xl font-bold m-6">Register</h1>
      <RegisterForm />
      <hr className="border-t border-gray-300 w-full max-w-md lg:max-w-2xl my-4" />
      <div className="flex w-full items-center justify-center p-3 m-2 bg-gray-900 rounded-lg cursor-pointer max-w-xs text-center">
        <span className="text-white">Continue with Google</span>
      </div>
      <div className="flex w-full items-center justify-center p-3 bg-gray-900 rounded-lg cursor-pointer max-w-xs text-center">
        <span className="text-white">Continue with Apple</span>
      </div>
    </div>
  );
};

export default Page;
