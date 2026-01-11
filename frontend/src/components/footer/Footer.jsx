const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto py-4 px-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Medicare Booking. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
