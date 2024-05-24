import { EColors } from "../EColors";
import DesktopAppInfo from "./desktopappinfo";
import DesktopEntryForm from "./desktopentryform";
import DesktopNav from "./desktopnav";

export default function Desktop() {
  return (
    <div className="  " style={{ backgroundColor: EColors.primaryBg }}>
      <DesktopNav />
      <DesktopEntryForm />
      <DesktopAppInfo />
    </div>
  );
}
