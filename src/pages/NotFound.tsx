import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white">
            <h1 className="text-7xl font-bold">404</h1>
            <p className="text-xl mt-4">Page Not Found</p>

            <button
                onClick={() => navigate("/")}
                className="mt-6 px-6 py-2 bg-white text-black rounded-lg"
            >
                Go Home
            </button>
        </div>
    );
};