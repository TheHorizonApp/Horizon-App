import LoginForm from "../../components/LoginForm";
const Page = () => {

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-4">
      <h1 className="text-4xl font-bold mb-12">Log in</h1>
      <LoginForm />
    </div>
  );
};

export default Page;
