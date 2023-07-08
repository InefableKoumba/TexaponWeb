export function TopBar({ setisLoggedIn }) {
  return (
    <nav className="flex fixed z-50 w-full justify-end items-center bg-[#0071BC] py-4 px-4">
      <div className="w-8 mr-4"></div>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          setisLoggedIn(false);
        }}
        className="border rounded bg-[#fff] text-[#0071BC] py-2 px-2 border-slate-500 w-50 h-50"
      >
        Déconnexion
      </button>
    </nav>
  );
}
