import { EColors } from "../EColors";

export default function DesktopNav() {
  return (
    <nav
      className="h-24  text-5xl flex items-center"
      style={{ backgroundColor: EColors.primary, fontFamily: "Inter" }}
    >
      <div className="ml-10 font-extrabold">LoanGuard Financial</div>
    </nav>
  );
}
