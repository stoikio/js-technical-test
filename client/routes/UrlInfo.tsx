import { FC } from "react";
import { useParams, Link } from "react-router-dom";

export const UrlInfo: FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">URL Info</h1>
          <p className="text-gray-600">Details for URL</p>
        </div>

        <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg p-6 shadow-sm text-center">
          <p className="text-sm text-gray-500 mb-2">ID</p>
          <p className="text-xl font-mono text-gray-900">{id}</p>
        </div>

        <div className="text-center mt-8">
          <Link to="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
