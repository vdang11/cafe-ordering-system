function MainLayout({ children }) {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-muted">
      {children}
    </div>
  );
}

export default MainLayout;