import { TopBar, Frame } from "@shopify/polaris";
import { Outlet } from "react-router-dom";

function Layout() {
  const userMenuMarkup = (
    <TopBar.UserMenu name="Xquenda Andreev" initials="XA" />
  );

  const topBarMarkup = <TopBar userMenu={userMenuMarkup} />;

  return (
    <Frame topBar={topBarMarkup}>
      <Outlet />
    </Frame>
  );
}

export default Layout;
