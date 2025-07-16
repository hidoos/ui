
export const FieldError = ({ error }: { error?: { message?: string; }; }) => {
  if (!error?.message) return null;

  return (
    <p className="text-sm text-red-500 mt-1">
      {error.message}
    </p>
  );
};
