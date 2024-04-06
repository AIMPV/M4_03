const Alert = ({ children, color }) => {
  return (
    <>
      <div className={`alert alert-${color} my-2 text-center`}>{children}</div>
    </>
  );
};
export default Alert;
