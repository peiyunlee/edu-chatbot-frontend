function ReflectHeader({ title }) {
  return (
    <header className="flex items-center h-header px-4 bg-purple-400 text-white">
      <h1 className="font-bold text-lg">{title}</h1>
    </header>
  );
}

export default ReflectHeader;