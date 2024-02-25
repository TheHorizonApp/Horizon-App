import LoginForm from "../../components/LoginForm";
const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black dark:text-white dark:bg-black px-4 py-10">
      <h1 className="text-4xl font-bold mb-12">Log in</h1>
      <div className="border-b border-gray-300 my-4"></div>
      <div className="flex w-full items-center justify-center p-3 m-2 bg-gray-900 rounded-lg cursor-pointer max-w-xs">
        <span className="text-white">Continue with Google</span>
      </div>
      <div className="flex w-full items-center justify-center p-3 bg-gray-900 rounded-lg cursor-pointer max-w-xs">
        <span className="text-white">Continue with Apple</span>
      </div>
      <LoginForm />
    </div>
  );
};

export default Page;
