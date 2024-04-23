const ErrorComponent = ({ error }: { error: string }) => {
  return (
    <div>
        <div className="text-center justify-center text-red-500">{error}</div>
    </div>
  );
};

export default ErrorComponent;