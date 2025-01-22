import {Link} from  'react-router-dom';
const RegisterForm = () => {
    return (
      <form className="max-w-sm mx-auto w-full text-xl mt-10 mb-10 p-6 border-2 border-gray-300 rounded-lg shadow-lg">
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 font-medium text-gray-900 dark:text-white text-xl">
            Your name
          </label>
          <input
            type="text"
            id="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 font-medium text-gray-900 dark:text-white text-xl">
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="email@gmail.com"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="*********"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="repeat-password" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
            Repeat password
          </label>
          <input
            type="password"
            id="repeat-password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="*********"
            required
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label htmlFor="terms" className="ml-2 text-xl font-medium text-gray-900 dark:text-gray-300">
            I agree with the{' '}
            <a href="#" className="text-blue-600 text-xl hover:underline dark:text-blue-500">
              terms and conditions
            </a>
          </label>
        </div>
        <button
          type="submit"
          className="text-xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register 
        </button>
        <div className="text-center mt-4">
      <p className="text-gray-700 text-lg">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
      </form>
    );
  };
  
  export default RegisterForm;
  