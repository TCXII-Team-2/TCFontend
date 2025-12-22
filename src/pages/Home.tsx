import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="flex flex-row justify-around gap-150 m-8">
        <img
          src={logo}
          alt="logo"
          width={100}
          height={100}
          className="cursor-pointer"
        />
        <div className="flex flex-row gap-8">
          <button className="font-bold cursor-pointer  hover:text-[#636363] active:scale-90">
            contact
          </button>
          <button className="font-bold text-[#4A84DD] cursor-pointer hover:text-[#0066ff4b] active:scale-90">
            about us
          </button>
        </div>
      </nav>

      <section className="flex flex-col justify-center items-center bg-[#F5F5F5] h-89 mb-0 ">
        <h1 className="font-extrabold text-4xl  p-8">
          Where <span className="text-[#4A84DD]"> AI </span> Meets <br />
          Customer Support
        </h1>
        <div className="flex gap-18 ">
          <button
            onClick={() => navigate("/login")}
            className="bg-[#4A84DD] text-white px-4 py-2 rounded font-bold cursor-pointer hover:shadow-2xl hover:bg-[#4a85dd90] p"
          >
            signin
          </button>
          <button
            onClick={() => navigate("/register")}
            className="  text-[#4A84DD] px-4 py-2 rounded font-bold bg-white cursor-pointer hover:bg[#e6e6e6] hover:shadow-2xl"
          >
            signup
          </button>
        </div>
      </section>
    </>
  );
}
