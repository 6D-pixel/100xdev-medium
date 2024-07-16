import { SignupInput } from "@6dpixel/common-medium";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInput, setPostInput] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
  });
  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,
        postInput
      );
      const jwt = response.data.jwt;
      console.log(jwt);
      localStorage.setItem("token", `Bearer ${jwt}`);
      navigate("/blog");
    } catch (e) {
      alert("request not successful")
      //alert user that the request was not successful
    }
  }
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="px-10">
          <div className="font-bold text-3xl px-10">
            {type === "signin" ? "Welcome back" : "Create an account"}
          </div>
          <div className="text-slate-500 px-10 font-medium">
            {type === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              className="pl-2 underline"
              to={type === "signin" ? "/signup" : "/signin"}
            >
              {type === "signin" ? "Signup" : "Login"}
            </Link>{" "}
          </div>
          {type === "signup" && (
            <LabelInput
              label="Username"
              placeholder="Enter your Username"
              onChange={(e) => {
                setPostInput({ ...postInput, name: e.target.value });
              }}
            />
          )}
          <LabelInput
            label="Email"
            placeholder="m@gmail.com"
            onChange={(e) => {
              setPostInput({ ...postInput, email: e.target.value });
            }}
          />
          <LabelInput
            label="Password"
            placeholder=""
            type="password"
            onChange={(e) => {
              setPostInput({ ...postInput, password: e.target.value });
            }}
          />
          <button
            onClick={sendRequest}
            type="button"
            className="w-full mt-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {type === "signin" ? "Signin" : "Signup"}
          </button>
        </div>
      </div>
    </div>
  );
};
interface LabelInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelInput({ label, placeholder, onChange, type }: LabelInputType) {
  return (
    <div className="pt-4">
      <label className="block mb-2 text-sm font-semibold text-gray-900">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
        placeholder={placeholder}
        required
      />
    </div>
  );
}
export default Auth;
