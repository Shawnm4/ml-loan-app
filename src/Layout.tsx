import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import { EColors } from "./EColors";

export default function Layout() {
  return (
    <>
      <main
        style={{ backgroundColor: EColors.primaryBg }}
        className="flex h-screen  "
      >
        <Content
          style={{
            height: "100vh",
            overflow: "auto",
          }}
          className="w-full  "
        >
          <Outlet />
        </Content>
      </main>
    </>
  );
}
