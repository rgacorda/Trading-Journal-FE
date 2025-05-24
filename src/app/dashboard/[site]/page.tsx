import AccountDashboard from "../_components/accounts/accounts";
import MainDashboard from "../_components/main/main";

export default async function SiteDashboardPage({
  params,
}: {
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;
  switch (site) {
    case "main":
      return <MainDashboard />;
      break;
    case "accounts":
      return <AccountDashboard />;
      break;
    default:
      return <>{site}</>;
      break;
  }
}
