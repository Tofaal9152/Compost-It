import { ErrorMessage, LoadingIndicator } from "./ScreenWrapper";

type LoaderWrapperProps = {
  isLoading: boolean;
  isError: boolean;
  error?: any;
  children: React.ReactNode;
};

const LoaderWrapper = ({
  isLoading,
  isError,
  error,
  children,
}: LoaderWrapperProps) => {
  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorMessage error={error} />;
  return <>{children}</>;
};

export default LoaderWrapper;
