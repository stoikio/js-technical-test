import { FC } from "react";

export const LoadingScreen: FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Starting app...
        </h2>
        <p className="text-gray-600">Waiting for API to be ready</p>
      </div>
    </div>
  );
};
