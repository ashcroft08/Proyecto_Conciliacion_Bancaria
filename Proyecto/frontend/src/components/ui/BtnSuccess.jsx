function BtnSuccess({ type, children, onClick, className }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-xl font-semibold text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${className}`}
    >
      {children}
    </button>
  );
}

export default BtnSuccess;
