// import React, { useState } from 'react';
// import axios from 'axios';

// const Auth = ({ setToken }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (isLogin) {
//       // login logic
//       try {
//         const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
//         localStorage.setItem('token', res.data.token);
//         setToken(res.data.token);
//       } catch (error) {
//         alert(error.response.data.message);
//       }
//     } else {
//       // signup logic
//       try {
//         await axios.post('http://localhost:5000/api/auth/signup', { email, password });
//         alert('Signup successful! Please login.');
//         setIsLogin(true); // Signup ke baad login dikhana
//       } catch (error) {
//         alert(error.response.data.message);
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-80">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           {isLogin ? 'Login' : 'Signup'}
//         </h2>

//         <form onSubmit={handleSubmit} className="flex flex-col">
//           <input
//             type="email"
//             placeholder="Email"
//             className="border p-2 mb-4 rounded"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="border p-2 mb-4 rounded"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//           >
//             {isLogin ? 'Login' : 'Signup'}
//           </button>
//         </form>

//         <div className="text-center mt-4">
//           {isLogin ? (
//             <>
//               Don't have an account?
//               <button
//                 className="text-blue-500 ml-2"
//                 onClick={() => setIsLogin(false)}
//               >
//                 Signup
//               </button>
//             </>
//           ) : (
//             <>
//               Already have an account?
//               <button
//                 className="text-blue-500 ml-2"
//                 onClick={() => setIsLogin(true)}
//               >
//                 Login
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true); // Login ya Signup ka toggle
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const res = await axios.post(url, { email, password });

      const token = res.data.token;
      localStorage.setItem("token", token);
      setToken(token);

      navigate("/dashboard"); // ✅ seedha dashboard pe le jaayega
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isLogin ? "Login" : "Signup"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
