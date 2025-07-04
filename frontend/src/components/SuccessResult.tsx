interface SuccessResultProps {
  shortenedUrl: string;
  onCopy: () => void;
}

export default function SuccessResult({
  shortenedUrl,
  onCopy,
}: SuccessResultProps) {
  if (!shortenedUrl) return null;

  return (
    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
      <p className="text-sm text-green-800 mb-2">
        ✅ URL shortened successfully!
      </p>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={shortenedUrl}
          readOnly
          className="flex-1 px-3 py-2 text-sm border border-green-300 rounded bg-white"
        />
        <button
          onClick={onCopy}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
        >
          Copy
        </button>
        <a
          href={shortenedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
        >
          Visit
        </a>
      </div>
    </div>
  );
}
