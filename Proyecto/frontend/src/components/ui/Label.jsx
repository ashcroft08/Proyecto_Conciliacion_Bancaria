function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-900"
    >
      {children}
    </label>
  );
}

export default Label;